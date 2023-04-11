from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import Integer, String, DATETIME

class Booking(db.Model):
    __tablename__ = 'bookings'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    type = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    user = db.relationship('User', back_populates='bookings', foreign_keys=[user_id])
    image_url = db.Column(db.String(255))
    color = db.Column(db.String(255))
    weight = db.Column(db.Integer)
    birthday = db.Column(db.DateTime)


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'type': self.type,
            'user_id': self.user_id,
            'image_url': self.image_url,
            'color': self.color,
            'weight': self.weight,
            'birthday': self.birthday
        }
