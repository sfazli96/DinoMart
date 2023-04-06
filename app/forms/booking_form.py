from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField, SubmitField
from wtforms.validators import DataRequired, URL

class BookingForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    type = StringField('Type', validators=[DataRequired()])
    image_url = StringField('Image URL', validators=[DataRequired(), URL()])
    color = StringField('Color', validators=[DataRequired()])
    weight = IntegerField('Weight', validators=[DataRequired()])
    birthday = DateField('Birthday', validators=[DataRequired()])
    submit = SubmitField('Create Booking')
