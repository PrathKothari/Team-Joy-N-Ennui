from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv
import os
from functions import gemini_pro_response, nutrient
from PIL import Image

app = Flask(__name__)
CORS(app)

load_dotenv()
api_key = os.getenv("api_key")
genai.configure(api_key=api_key)

app.config['UPLOAD_FOLDER'] = 'uploads/'

if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

@app.route('/recipies', methods=['GET','POST'])
def recipe():
    ingredients = request.get('ingredients')

    if not ingredients:
        return jsonify({"error": "No data provided"}), 400

    prompt_header = '''
     I would like to create a detailed, step-by-step recipe using everything, with a focus on minimizing or completely eliminating food waste. 
     Please suggest recipes that make the most of all the ingredients I have, ensuring nothing goes unused. 
     If possible, also include a second meal idea that uses any leftovers or scraps efficiently.
     
     I am cooking for one person, but I would like the option to increase the portions by scaling the recipe while keeping the same ratio of ingredients. 
     Please ensure the instructions are clear and easy to follow, with a focus on sustainability and zero waste.
    '''

    prompt = f"\n\nI have following Ingredients: {ingredients}" + prompt_header
    recipes = gemini_pro_response(prompt)

    return recipes

@app.route('/allergy', methods=['GET','POST'])
def allergy():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)
    img = Image.open(filepath)
    data = nutrient(img)

    prompt_header = '''
    You are Praj, an AI assistant focused on identifying allergens in food items. 
    Your task is to analyze JSON input resembling the output from the NutritionX API, which includes nutritional information about a specific food item. 
    From this data, extract and summarize the common allergens present, such as nuts, dairy, gluten, or shellfish. Additionally, list the typical allergic reactions associated with these allergens, including symptoms like hives, swelling, or digestive issues. 
    Finally, classify the potential allergic reactions by severity—mild, moderate, or severe—highlighting the implications for individuals with allergies. Your response should be clear and concise, providing essential information to help consumers understand the potential risks linked to the food item.
    '''

    prompt = prompt_header+data
    guidance_message = data + gemini_pro_response(prompt)

    return guidance_message

if __name__ == '__main__':
    app.run(debug=True)