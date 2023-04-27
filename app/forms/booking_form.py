from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField, SubmitField
from wtforms.validators import DataRequired, URL
from app.api.AWS_helpers import ALLOWED_EXTENSIONS
from flask_wtf.file import FileField, FileAllowed, FileRequired


class BookingForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    type = StringField('Type', validators=[DataRequired()])
    # image_url = StringField('Image URL', validators=[DataRequired(), URL()])
    image_url = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    color = StringField('Color', validators=[DataRequired()])
    weight = IntegerField('Weight', validators=[DataRequired()])
    birthday = DateField('Birthday', validators=[DataRequired()])
    submit = SubmitField('Create Booking')
