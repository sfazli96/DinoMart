from app.models import db, Product, environment, SCHEMA, Cart, cartJoined
from sqlalchemy.sql import text
import datetime
from random import choice

def seed_cart():
    products = Product.query.all()
    carts = []
    for i in range(10):
        cart = Cart(
            user_id=i + 1,
            product_id=choice(products).id
        )
        carts.append(cart)
        db.session.add(cart)

    db.session.commit()

    cart_joins = []
    for cart in carts:
        product = Product.query.filter_by(id=cart.product_id).first()
        join = {
            "cart_id": cart.id,
            "product_id": cart.product_id,
        }
        cart_joins.append(join)
        db.session.execute(cartJoined.insert().values(join))

    db.session.commit()

    print("Cart items seeded successfully!")





def undo_cart():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cart RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cart"))

    db.session.commit()
