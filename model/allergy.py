from Consolidated_model import data
import google.generativeai as genai
api_key= "AIzaSyA5sshngNj9Yiz2U8kHrH3q8oGY1rrXq1c"

def removeSymbols(response):
    return response.strip().replace("*", '')

def gemini_pro_response(user_prompt):
    gemini_pro_model = genai.GenerativeModel("gemini-pro")
    response = gemini_pro_model.generate_content(user_prompt)
    return removeSymbols(response.text)

prompt_header = '''
You are Praj, an AI assistant focused on identifying allergens in food items. 
Your task is to analyze JSON input resembling the output from the NutritionX API, which includes nutritional information about a specific food item. 
From this data, extract and summarize the common allergens present, such as nuts, dairy, gluten, or shellfish. Additionally, list the typical allergic reactions associated with these allergens, including symptoms like hives, swelling, or digestive issues. 
Finally, classify the potential allergic reactions by severity—mild, moderate, or severe—highlighting the implications for individuals with allergies. Your response should be clear and concise, providing essential information to help consumers understand the potential risks linked to the food item.
'''

prompt = prompt_header+data
guidance_message = data + gemini_pro_response(prompt)
guidance_message