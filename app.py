from flask import Flask, render_template, request, jsonify
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_quote', methods=['POST'])
def get_quote():
    # Collecting data from the form
    customer_name = request.form.get('customer_name')
    customer_email = request.form.get('customer_email')
    insurance_type = request.form.get('insurance_type')
    coverage_amount = request.form.get('coverage_amount')
    age = request.form.get('age')

    # Process the inputs
    quote = calculate_quote(insurance_type, coverage_amount, age)

    # Simulate personalized email content
    email_content = generate_quote_email(customer_name, insurance_type, quote)

    return jsonify({
        'customer': {
            'name': customer_name,
            'email': customer_email,
        },
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

    if insurance_type == "Auto":
        insurance_factor = 1.2
    elif insurance_type == "Home":
        insurance_factor = 1.5
    else:  # Default or "Health"
        insurance_factor = 1.0

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