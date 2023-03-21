from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text

def seed_products():
    t_rex = Product(
        name='Tyrannosaurus Rex',
        description='The fearsome "tyrant lizard king" of the Cretaceous period.',
        image_url='https://images.ctfassets.net/cnu0m8re1exe/59qssnh6iHfxY2r3FrctNZ/195cca2a860caed3b434a2d3de1ea555/trex.jpg?fm=jpg&fl=progressive&w=660&h=433&fit=fill',
        price=9.99,
        size='Huge'
    )

    triceratops = Product(
        name='Triceratops',
        description='A large herbivorous dinosaur with three horns on its head.',
        image_url='https://i.natgeofe.com/n/b96b572c-98e2-4ec2-a714-08a6b95cf646/triceratopshorridus_hexdcb_3x2.jpg',
        price=12.99,
        size='Large'
    )

    pterodactyl = Product(
        name='Pterodactyl',
        description='A flying reptile with a wingspan of up to 33 feet.',
        image_url='https://cdn.mos.cms.futurecdn.net/6vA8wWskCkUgffN9dbQhvh.jpg',
        price=7.99,
        size='Medium'
    )

    stegosaurus = Product(
        name='Stegosaurus',
        description='A heavily-armored dinosaur with distinctive plates on its back.',
        image_url='https://cdn.mos.cms.futurecdn.net/owYTb9X5fKpeBhgiaxD73b-1200-80.jpg',
        price=14.99,
        size='Large'
    )

    velociraptor = Product(
        name='Velociraptor',
        description='A small, agile dinosaur with a deadly retractable claw on each foot.',
        image_url='https://i.natgeofe.com/n/5c3c8fb7-b1e4-495b-a943-9f812fbb320f/velociraptor-mongoliensis_2490029_2x1.jpg',
        price=10.99,
        size='Small'
    )

    db.session.add(t_rex)
    db.session.add(triceratops)
    db.session.add(pterodactyl)
    db.session.add(stegosaurus)
    db.session.add(velociraptor)
    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.product RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM product"))

    db.session.commit()
