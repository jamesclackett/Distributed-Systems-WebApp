/**
 * Controller for calculating loan offers
 * Takes a client information object as a request
 * Retuns a loan ofer response
 * 
 * The loan offer is calculated by combing the requested loan details with
 * Client details like credit score.
 */

const providerName = 'Bank Of Ireland';
const linkToImage = "https://pbs.twimg.com/profile_images/1675809938487095297/DlQNzfCA_400x400.jpg";


const calculateLoan = (req, res) => {
    // Parse the JSON request body
    const { loanAmount, creditScore, loanTermLength } = req.body;
    
    if (!loanAmount || !creditScore) {
        return res.status(400).send('Invalid request');
    }

    // Calculate the interest rate
    let interestRate = 0;
    
    if (creditScore < 600) {
        interestRate = 0.081;
    } else if (creditScore < 700) {
        interestRate = 0.078;
    } else {
        interestRate = 0.072;
    }

    // Calculate the monthly payment
    const monthlyPayment = (loanAmount * (interestRate + 1)) / loanTermLength;
    const totalPayment = monthlyPayment * loanTermLength;

    console.log('Interest rate:', interestRate);
    console.log('Interest rate:', monthlyPayment);

    // Prepare the response body
    const responseBody = {
        providerName,
        linkToImage,
        totalPayment,
        monthlyPayment,
        interestRate
    };

    // Send the response
    res.json(responseBody);

    // Log the request
    console.log('Received request to calculate loan');
    console.log('Request body:', req.body);
    console.log('Response body:', responseBody);
    
}

module.exports = calculateLoan