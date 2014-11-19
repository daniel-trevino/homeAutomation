import RPi.GPIO as GPIO
import os
from flask import Flask, render_template
app = Flask(__name__)

GPIO.setmode(GPIO.BOARD)

pins = {
	22 : {'name' : 'Cuarto 1', 'state' : GPIO.LOW},
	24 : {'name' : 'Cuarto 2', 'state' : GPIO.LOW},
	26 : {'name' : 'Jardin', 'state' : GPIO.LOW},
	7 : {'name' : 'Panico', 'state' : GPIO.LOW}
}

for pin in pins:
	GPIO.setup(pin, GPIO.OUT)
	GPIO.output(pin, GPIO.LOW)

@app.route("/")
def index():
	for pin in pins:
		pins[pin]['state'] = GPIO.input(pin)
	templateData = {
		'pins' : pins
	}
	return render_template('index.html', **templateData)

@app.route("/<changePin>/<action>")
def action(changePin, action):
	changePin = int(changePin)
	deviceName = pins[changePin]['name']
	if action == "on":
		GPIO.output(changePin, 1)
		message = "Turned " + deviceName + " on."
	if action == "off":
		GPIO.output(changePin, 0)
		message = "Turned " + deviceName + " off."
	if action == "toggle":
		GPIO.output(changePin, not GPIO.input(changePin))
		message = "Toggled " + deviceName + "."

	for pin in pins:
		pins[pin]['state'] = GPIO.input(pin)

	templateData = {
		'message' : message,
		'pins' : pins,
	}
	
	return render_template('index.html', **templateData)

if __name__ == "__main__":
	app.run(host='0.0.0.0', port=80, debug=True)

