from flask import Flask, render_template, request, jsonify
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_quote', methods=['POST'])
def get_quote():
    # Collect form data
    data = request.json
    print("Incoming Data:", data)  # Debugging: Log the incoming data

    # Extract fields
    customer_name = data.get('customer_name')
    customer_email = data.get('customer_email')
    insurance_type = data.get('insurance_type')
    coverage_amount = data.get('coverage_amount')
    age = data.get('age')

    # Validate input
    errors = []
    if not customer_name:
        errors.append("Name is required.")
    if not customer_email or "@" not in customer_email:
        errors.append("Valid email is required.")
    if not insurance_type:
        errors.append("Insurance type is required.")
    if not coverage_amount or not str(coverage_amount).isdigit():
        errors.append("Valid coverage amount is required.")
    if not age or not str(age).isdigit():
        errors.append("Valid age is required.")

    if errors:
        return jsonify({'errors': errors}), 400

    # Process the quote
    quote = calculate_quote(insurance_type, coverage_amount, age)
    email_content = generate_quote_email(customer_name, insurance_type, quote)

    # Return JSON response
    return jsonify({
        'customer': {'name': customer_name, 'email': customer_email},
        'insurance_type': insurance_type,
        'coverage_amount': coverage_amount,
        'quote': quote,
        'email_content': email_content,
    })

def calculate_quote(insurance_type, coverage_amount, age):
    """Calculates a sample insurance quote."""
    base_rate = 100
    age_factor = (100 - int(age)) * 0.5
    coverage_factor = int(coverage_amount) * 0.01

    insurance_factors = {
        "Auto": 1.2,
        "Home": 1.5,
        "Health": 1.0
    }
    insurance_factor = insurance_factors.get(insurance_type, 1.0)

    return round(base_rate + age_factor + coverage_factor * insurance_factor, 2)

def generate_quote_email(customer_name, insurance_type, quote):
    """Generates a personalized email for the quote."""
    return f"""
Hello {customer_name},

Thank you for your interest in our {insurance_type} insurance plans.

Based on the information you provided, your estimated monthly premium is ${quote}.

We look forward to helping you secure the best coverage for your needs.

Best regards,
Insurance Quoting Team
    """

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
