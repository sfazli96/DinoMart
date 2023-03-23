from app.models import db, Product, environment, SCHEMA, User, Cart, cartJoined
from sqlalchemy.sql import text
import datetime
from random import choice
from random import randint
def seed_cart():
    products = Product.query.all()
    users = User.query.all()
    carts = []
    for user in users:
        cart = Cart(
            user_id=user.id,
            product_id=choice(products).id,
            quantity=randint(1, 50)
        )
        carts.append(cart)
        db.session.add(cart)

    db.session.commit()

    cart_joins = []
    for cart in carts:
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
