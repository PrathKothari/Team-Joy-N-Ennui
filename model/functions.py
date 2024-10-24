import google.generativeai as genai
import os
import torch
import torch.nn as nn
import torchvision
import requests
import json
from PIL import Image
import warnings

def gemini_pro_response(user_prompt):
    gemini_pro_model = genai.GenerativeModel("gemini-pro")
    response = gemini_pro_model.generate_content(user_prompt)
    return removeSymbols(response.text)

def removeSymbols(response):
    return response.strip().replace("*", '')

def nutrient(img):
    # Ignore warnings
    warnings.filterwarnings("ignore")

    # Constants for the Nutrition API
    APP_ID = os.getenv("app_id")
    APP_KEY = os.getenv("nutri_api_key")

    with open("class_names.txt", "r") as f:
        class_names = [food101_class_names.strip() for food101_class_names in f.readlines()]

    # Model and transforms preparation
    effnetb3 = torchvision.models.efficientnet_b3()

    # Modify the classifier to match the Food101 dataset (101 classes)
    effnetb3.classifier = nn.Sequential(
        nn.Dropout(p=0.3),
        nn.Linear(in_features=1536, out_features=101)  # 101 is the number of classes for Food101
    )

    # Load the pre-trained weights for this modified architecture
    effnetb3.load_state_dict(
        torch.load("09_pretrained_effnetb2_food101_2_model.pth", 
                    map_location=torch.device("cpu")), 
        strict=False
    )

    # Load the default EfficientNet weights
    weights = torchvision.models.EfficientNet_B3_Weights.DEFAULT
    effnetb3_transforms = weights.transforms()

    # Predict function
    def predict(img):
        # Transform the target image and add a batch dimension
        img = effnetb3_transforms(img).unsqueeze(0)

        # Put model into evaluation mode and turn on inference mode
        effnetb3.eval()
        with torch.inference_mode():
            # Pass the transformed image through the model
            pred_probs = torch.softmax(effnetb3(img), dim=1)

        # Get the predicted class index and label
        predicted_class_idx = torch.argmax(pred_probs, dim=1).item()
        predicted_class_label = class_names[predicted_class_idx]
        return predicted_class_label

    # Get predicted class label
    predicted_class_label = predict(img)

    # Function to get nutrition data
    def get_nutrition_data(food_item):
        url = 'https://trackapi.nutritionix.com/v2/natural/nutrients'
        headers = {
            'Content-Type': 'application/json',
            'x-app-id': APP_ID,
            'x-app-key': APP_KEY
        }

        # Create the body of the request
        data = {
            "query": food_item  # Use the food_item parameter
        }

        # Send the POST request
        response = requests.post(url, headers=headers, data=json.dumps(data))

        # Check the response status code
        if response.status_code == 200:
            # Parse the JSON response
            return response.json()
        else:
            print(f"Error: {response.status_code}")
            print(response.text)
            return None

    # Function to get nutrients
    def get_nutrients(predicted_class_label):
        # Define a mapping of attr_id to nutrient names
        nutrient_mapping = {
            "nf_calories": "calories",
            "nf_sodium": "sodium",
            "nf_protein": "protein",
            "nf_total_fat": "fat",
            "nf_total_carbohydrate": "carbohydrates",
            "nf_dietary_fiber": "fiber",
            "nf_sugars": "sugar",
            201: "vitamin_a",
            401: "calcium",
            404: "iron",
            405: "vitamin_c",
        }

        # Main execution
        food_item = predicted_class_label  # Use the predicted class label as the food item
        nutrition_info = get_nutrition_data(food_item)

        if nutrition_info:
            # Transform the data
            transformed_data = {}

            for food in nutrition_info["foods"]:
                food_name = food["food_name"]
                transformed_data[food_name] = {
                    "calories": food.get("nf_calories", 0),
                    "sodium": food.get("nf_sodium", 0),
                    "protein": food.get("nf_protein", 0),
                    "fat": food.get("nf_total_fat", 0),
                    "carbohydrates": food.get("nf_total_carbohydrate", 0),
                    "fiber": food.get("nf_dietary_fiber", 0),
                    "sugar": food.get("nf_sugars", 0),
                    # Initialize vitamins and minerals
                    "vitamin_a": 0.0,
                    "vitamin_c": 0.0,
                    "iron": 0.0,
                    "calcium": 0.0,
                }

                # Extract full nutrients
                for nutrient in food.get("full_nutrients", []):
                    attr_id = nutrient["attr_id"]
                    if attr_id in nutrient_mapping:
                        nutrient_name = nutrient_mapping[attr_id]
                        transformed_data[food_name][nutrient_name] = nutrient["value"]

            # Convert to JSON string
            json_output = json.dumps(transformed_data, indent=4)

            # Return the transformed data
            return json_output

    # Get nutrients and print the data
    data = get_nutrients(predicted_class_label)
    return data