from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# Database for storing flights and bookings
flights = {}
bookings = {}

# Landing page
@app.route('/')
def index():
    return render_template('home.html')

# User login
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # Handle login logic here
        # Check username and password
        user_type = request.form.get('user_type')
        if user_type == 'user':
            return redirect(url_for('user_dashboard'))
        elif user_type == 'admin' and request.form['username'] == 'admin' and request.form['password'] == 'admin':
            return redirect(url_for('admin_dashboard'))
        else:
            return "Invalid credentials. Please try again."
    return render_template('login.html')

# User dashboard
@app.route('/user/dashboard')
def user_dashboard():
    return render_template('user_dashboard.html')

# Search for flights
@app.route('/user/search', methods=['GET', 'POST'])
def search_flights():
    if request.method == 'POST':
        # Handle flight search logic here
        # For simplicity, let's assume flights are available from 4 to 9 AM for every date
        # You can implement a more complex logic here to check actual availability
        date = request.form.get('date')
        available_flights = [(f"No: {i}", f"Date: {date}", f"Time: {time}") for i, time in enumerate(range(4, 10))]
        return render_template('search_results.html', flights=available_flights)
    return render_template('search_flights.html')

# Book a flight

# Book a flight
@app.route('/user/book', methods=['POST'])
def book_flight():
    # Get the details of the selected flight from the form data
    flight_details = request.form.get('flight_details')
    
    # Check if the flight is already booked
    if flight_details in bookings:
        return "Flight is already booked."
    
    # If the flight is available, book it
    bookings[flight_details] = 'Booked'
    
    # Redirect to the user's bookings page
    return redirect(url_for('user_bookings'))

# View user bookings
@app.route('/user/mybookings')
def user_bookings():
    return render_template('user_bookings.html', bookings=bookings)

# Admin dashboard
@app.route('/admin/dashboard')
def admin_dashboard():
    return render_template('admin_dashboard.html')


@app.route('/admin/add_flight', methods=['GET', 'POST'])
def add_flight():
    if request.method == 'POST':
        # Handle adding flight logic here
        flight_number = request.form.get('flight_number')
        date = request.form.get('date')
        time = request.form.get('time')
        flight_details = f"Flight Number: {flight_number}, Date: {date}, Time: {time}"
        flights[flight_number] = flight_details
        return redirect(url_for('admin_dashboard'))
    return render_template('add_flight.html')

# Remove a flight
@app.route('/admin/remove_flight', methods=['GET', 'POST'])
def remove_flight():
    if request.method == 'POST':
        # Handle removing flight logic here
        flight_number = request.form.get('flight_number')
        if flight_number in flights:
            del flights[flight_number]
            return redirect(url_for('admin_dashboard'))
        else:
            return "Flight not found."
    return render_template('remove_flight.html')

# View all bookings for a flight
# View all bookings for a flight
@app.route('/admin/view_bookings')
def view_bookings():
    # Add some sample bookings with flight names, dates, and times for demonstration
    bookings['Flight 1'] = [{'name': 'John Doe', 'date': '2024-02-21', 'time': '09:00'},
                            {'name': 'Jane Smith', 'date': '2024-02-22', 'time': '10:30'}]
    bookings['Flight 2'] = [{'name': 'Alice Johnson', 'date': '2024-02-23', 'time': '12:00'},
                            {'name': 'Bob Brown', 'date': '2024-02-24', 'time': '14:30'}]
    bookings['Flight 3'] = [{'name': 'Charlie Davis', 'date': '2024-02-25', 'time': '16:00'},
                            {'name': 'David Wilson', 'date': '2024-02-26', 'time': '18:30'}]

    return render_template('view_bookings.html', bookings=bookings)

if __name__ == '__main__':
    app.run(debug=True)
