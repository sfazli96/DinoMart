from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text

def seed_products():
    t_rex = Product(
        name='Tyrannosaurus Rex',
        description='The fearsome "tyrant lizard king" of the Cretaceous period.',
        image_url='https://images.ctfassets.net/cnu0m8re1exe/59qssnh6iHfxY2r3FrctNZ/195cca2a860caed3b434a2d3de1ea555/trex.jpg?fm=jpg&fl=progressive&w=660&h=433&fit=fill,https://www.pnas.org/cms/asset/52f3513b-ade3-48f2-b48c-a9fb0483e75d/keyimage.jpg',
        price=99.99,
        size='Large'
    )

    triceratops = Product(
        name='Triceratops',
        description='A large herbivorous dinosaur with three horns on its head.',
        image_url='https://i.natgeofe.com/n/b96b572c-98e2-4ec2-a714-08a6b95cf646/triceratopshorridus_hexdcb_3x2.jpg',
        price=62.99,
        size='Large'
    )

    pterodactyl = Product(
        name='Pterodactyl',
        description='A flying reptile with a wingspan of up to 33 feet and super fast as well.',
        image_url='https://cdn.mos.cms.futurecdn.net/6vA8wWskCkUgffN9dbQhvh.jpg',
        price=77.99,
        size='Medium'
    )

    stegosaurus = Product(
        name='Stegosaurus',
        description='A heavily-armored dinosaur with distinctive plates on its back.',
        image_url='https://cdn.mos.cms.futurecdn.net/owYTb9X5fKpeBhgiaxD73b-1200-80.jpg',
        price=64.99,
        size='Large'
    )

    velociraptor = Product(
        name='Velociraptor',
        description='A small, agile dinosaur with a deadly retractable claw on each foot but very fast.',
        image_url='https://i.natgeofe.com/n/5c3c8fb7-b1e4-495b-a943-9f812fbb320f/velociraptor-mongoliensis_2490029_2x1.jpg',
        price=90.99,
        size='Small'
    )
    megalodon = Product(
        name='Megalodon',
        description='A Large extinct species of a shark that lived for about 3.6 million years.',
        image_url='https://i.natgeofe.com/k/f7893e07-ad11-4423-b711-0fda77eea7f9/megalodon_3x2.jpg',
        price=100.99,
        size='Extra-Large'
    )
    mammoth = Product(
        name='Mammoth',
        description='A very large species that is equipped with long, curved tusks and northern species, a coverting hair',
        image_url='https://cdn.britannica.com/09/74609-050-21E14E52/example-museum-replica-species-Canadian-de-extinction.jpg,https://th-thumbnailer.cdn-si-edu.com/KhQpxF9E1onrrw8Pq4s-55KUnlc=/fit-in/1600x0/filters:focal(720x533:721x534)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/51/e9/51e9c7d8-440a-46c8-88be-eec9ee55f2a0/mammoth_painting_havens_web.jpg',
        price=70.99,
        size='Large'
    )
    






    db.session.add(t_rex)
    db.session.add(triceratops)
    db.session.add(pterodactyl)
    db.session.add(stegosaurus)
    db.session.add(velociraptor)
    db.session.add(megalodon)
    db.session.add(mammoth)


    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
