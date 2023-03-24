from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text

def seed_products():
    t_rex = Product(
        name='Tyrannosaurus Rex',
        description='The fearsome "tyrant lizard king" of the Cretaceous period. It is often called T.rex or T-Rex is one of the best theropods. It lived over 83.6 million years ago during the Cretaceous Era.The T-rexs speed is about 17 miles per hour and you can race with it as well. This creature is also very tall as well at height of 12-20 ft compared to an owner then they can be very tall. Sometimes they can be aggressive and then practiced cannibalism but you can just train them well to not get aggressive. This is one of the most fiercest predators of all time so if you get this now limited time, this creature will be your guard from any danger. While this creature does have a good amount of strengths, one of the weakness is that the dinosaur had small arms but no matter you can still help your creature. Some scientist say it may have been used for "vicious slashing" but its speculation. This is one of the best times to buy this creature and has alot of good information as well. Only at SamMart.',
        image_url='https://images.ctfassets.net/cnu0m8re1exe/59qssnh6iHfxY2r3FrctNZ/195cca2a860caed3b434a2d3de1ea555/trex.jpg?fm=jpg&fl=progressive&w=660&h=433&fit=fill',
        price=999.99,
        size='Large'
    )

    triceratops = Product(
        name='Triceratops',
        description='A large herbivorous dinosaur with three horns on its head. This herbivore dinosaur appeared during late Cretaceous period like about 68 million years ago in where we live now North America. They eat Cycads and Palms but they can be eaten by a T-rex. This creature always moved on 4 legs. It had horny beak and a shearing teeth. This creature weight a big 5500kg. One interesting thing that Triceratops remains are found individually and not in a herd as much as other creatures. Triceratops always protect its neck from any type of danger that might happen. It is one of the most largest and striking land animal. This creature can still defend itself from a T-rex. This is an amazing time to get this product as some people enjoy having a Triceratops as there creature. Only at SamMart.',
        image_url='https://i.natgeofe.com/n/b96b572c-98e2-4ec2-a714-08a6b95cf646/triceratopshorridus_hexdcb_3x2.jpg',
        price=62.99,
        size='Large'
    )

    pterodactyl = Product(
        name='Pterodactyl',
        description='A flying reptile with a wingspan of up to 33 feet and super fast as well. This creature lived about 201 million years ago during an period called Hettangian period. According to scientist, its scientific name is referred to as Winged Finger. The pterodactyl is also referred to one of the biggest flying bird to have ever lived. Alot of owners really like this creature because it is just unique, never seen it in awhile. This is an amazing time to get this product as some people enjoy having a pterodactyl as there creature. Only at SamMart.',
        image_url='https://cdn.mos.cms.futurecdn.net/6vA8wWskCkUgffN9dbQhvh.jpg',
        price=77.99,
        size='Medium'
    )

    stegosaurus = Product(
        name='Stegosaurus',
        description='A heavily-armored dinosaur with distinctive plates on its back. This creature has a kite-shaped plates along there back and tails. The Stegosaurus lived about 155 million years ago during the late Jurassic Period. They eat Moss and Cycads but can be eaten by Allosaurus and Ceratosaurus. This large creature can also move at a slow moving place that eats plants. They mostly defend them self from predators like Allosaurus and Ceratosaurus. This type of dinosaur is a armoured one meaning that it protects itself from the body armor they have and there spike tail as well. As you see in the picture they have bony plates along there back therefore some armor to protect them from predators. So owners will understand what they can do and take care of there creature to get. Only at SamMart.',
        image_url='https://cdn.mos.cms.futurecdn.net/owYTb9X5fKpeBhgiaxD73b-1200-80.jpg',
        price=64.99,
        size='Large'
    )

    velociraptor = Product(
        name='Velociraptor',
        description='A small, agile dinosaur with a deadly retractable claw on each foot but very fast. This crazy small/medium size creature can be viciscious or just friendly. Velociraptors have lived about 75 million to 71 million years ago during the Late Creataceous Period. The speed of a velociraptor is just amazing with a whopping 25 mph. The scientific name for this creature is Swift seizer. At that time, the velociraptor was 1.6ft tall and weighted no more than 45kg. They were a swift agile predator that avoid danger from other predators. Velociraptor can be cool as long as the owner knows how to take care of it. Only at SamMart ',
        image_url='https://i.natgeofe.com/n/5c3c8fb7-b1e4-495b-a943-9f812fbb320f/velociraptor-mongoliensis_2490029_2x1.jpg',
        price=90.99,
        size='Small'
    )
    megalodon = Product(
        name='Megalodon',
        description='A Large extinct species of a shark that lived for about 3.6 million years. The word Megaladon also means "big tooth" that lived about 23 to 3.6 million years ago from the early Miocence epohca. It is a close relative of the great white shark but is still considered a prehistoric creature. This creature was three times longer than the largest great white shark. Its scientific name is Otodus megalodon. The megalodon mostly ate meat, whales and large fish and sometimes other sharks as well. The megaladon likes to swim in the ocean alot. This is an amazing time to get this product. Only at SamMart. ' ,
        image_url='https://i.natgeofe.com/k/f7893e07-ad11-4423-b711-0fda77eea7f9/megalodon_3x2.jpg',
        price=100.99,
        size='Extra-Large'
    )
    mammoth = Product(
        name='Mammoth',
        description='A very large species that is equipped with long, curved tusks and northern species, a coverting hair. Alot of owners like to be around with there animals so say no more when you can get a mammoth and go on top of its trunk to give u a ride anywhere. The mammoth is a extinct group of elephants, so its a little similar. It was in every continent except South America. A wolly mammoth is known one of the best mammoths of all time. So, dont miss this opportunity to get your own mammoth. Only at SamMart.',
        image_url='https://cdn.britannica.com/09/74609-050-21E14E52/example-museum-replica-species-Canadian-de-extinction.jpg',
        price=70.99,
        size='Large'
    )
    # https://a-z-animals.com/media/2022/06/diplodocus-dinosaur.jpg for more images mammoth
    ankylosaurus = Product(
        name='Ankylosaurus',
        description='A heavily-armored dinosaur with a club-like tail. It lived dating to the very end of the Cretaceous Period, about 60-68 million years ago. Its fossils have been found in geological formation. This is something you do not want to miss, its one of the golden opportunities to buy this creature. The Ankylosaurus is 5.6ft tall and length of about 20-26ft. Since, this creature was a herbivorious, they mostly eat plants such as leaves, ferms, shrubs, etc. Only at SamMart.',
        image_url='https://static.wikia.nocookie.net/jurassicworld-evolution/images/6/65/JWEAnkylosaurus.png/revision/latest?cb=20210920183446',
        price=90.99,
        size='Medium'
    )
    brachiosaurus = Product(
        name='Brachiosaurus',
        description='A large, dinosaur with a small head and a massive body with a long-neck. This creature has lived during the Late Jurassic Era about like 154 to 150 million years ago. They are very tall creatures of a length of 85-98ft. A brachiosaurus can live up to 100 years old. They had long necks, high-domed heads, short tails and longer front legs. The average the creature eats between is 400 and 900 pounds of food per day. Do not miss out on this cool opportunity to checkout this dinosaur. The brachiosaurus was a herbivorous dinosaur, meaning that it only ate plants and did not eat meat at all. Only at SamMart.',
        image_url='https://i.natgeofe.com/k/4257f9a9-a1c0-4520-86ae-1c4c610db707/brachiosasurs_3x4.jpg',
        price=199.88,
        size='Large'
    )
    diplodocus = Product(
        name='Diplodocus',
        description='A long-necked dinosaur with a whip-like tail. This creature lived 161.2 million years ago and in 1877, its fossils were discovered. This creature lived during the Late Jurassic Era. Some of the dinosaurs did weigh about 30 tons but then a few amount weighed higher than 80 tons. Their tail was very long and super flexible. This creature was also very Tall about 15 ft. Only at SamMart.',
        image_url='https://a-z-animals.com/media/2022/06/diplodocus-dinosaur.jpg',
        price=210.66,
        size='Large'
    )
    allosaurus = Product(
        name='Allosaurus',
        description='A large, carnivorous dinosaur with sharp teeth and powerful jaws. This creature lived 155 to 145 million years ago also during the late Jurassic Period. The name Allosaurus means "different lizard", so you can get this creature and say that you have your own amazing lizard. This creature is derived from the Greek. The allosaurus eats other dinosaurs such as Stegosaurus and Brachiosaurus. The strength of its bite is about 3,572.56 Newtons. Only at SamMart.',
        image_url='https://www.nps.gov/dino/learn/nature/images/Allosaurus-fragilis-exhibit.jpg',
        price=210.99,
        size='Medium'
    )
    plesiosaurus = Product(
        name='Plesiosaurus ',
        description='A long-necked reptile with flippers for limbs. This large reptile lived during the Early Jurassic Period. It lived about 208 million years ago. Its mass is huge, really big 1,100 lbs. From a scientific point of view, they named it a "Near Lizard" probably because it looks close to a lizard. The length of this creature is 11ft. An interesting fact about the Plesiosaurus is that they lived mostly in a marine environment so if you like to swim in the ocean, fishing or any ocean activities, heres a creature you can get, Limited time only!! This plesiosaurus was also a carnivore at its time and it was reproduced by live birth plus there is 938 different specimens have been found by Paleontologists. As of now, these creatures were predators that swam and eat fish, aquatic reptiles and other ocean animals. Only at SamMart.',
        image_url='http://images.dinosaurpictures.org/plesiosaurus_549f.jpg',
        price=199.88,
        size='Large'
    )
    spinosaurus = Product(
        name='spinosaurus',
        description='A large, carnivorous dinosaur with a sail-like structure on its back. This creature lived in what we know now is North Africa during the Late Cretaceous Period, about 99 to 93 million years ago. There height was pretty tall, a whopping 18ft that ate other creatures like Onchopristis and Mawsonia. The spinosaurus scientific name is called "Spine Lizard" because its spine makes the creature look like a lizard. This is a good opportunity to get this creature and have your very one like lizard creature, but be careful they can be very aggressive and territorial. It only attacks other predators only if it invades there domain. This creature is also strong with a force of 4,200 lb per square inch which is similar to a modern Nile crocodile. Only at SamMart.',
        image_url='https://cdn.britannica.com/54/128854-050-F5C98A54/Spinosaurus.jpg?w=400&h=300&c=crop',
        price=210.66,
        size='Large'
    )
    t_rex_fossil = Product(
        name='T.rex Fossil',
        description='This T.rex creature is one of the largest dinosaur to ever have existed. The 1st skeleton of this creature was found in 1902 in Montana. The fossil shows that this dinosaur stood upright. Later, museum scientist were very determined that the reason was to show the Tyrannosaurus rex in a stalking position, head low, tail out extended and one foot just a bit raised. This creature lived 69 to 66 million years ago, at the very end of the Late Cretaceous Period. Many of the fossil remains of the T.rex does show wounds. It has two fused vertebrae where the neck joins the rib cage. From, these fossil there was evidence that there ribs were broken and then healed over. The first mention about the T.rex fossil was in 1902 by a legendary fossil hunter Barnum Brown. He said that this discovery was the "Large Carnivorous Dinosaur". It is one of the most crazy finding of any season. Do not miss out on this opportunity to get this fossil. Only at SamMart.',
        image_url='https://www.amnh.org/var/ezflow_site/storage/images/media/amnh/images/exhibitions/permanent-exhibitions/fossil-halls/hall-of-saurischian-dinosaurs2/tyranosaurus-rex-full-length-2460-1384/4162802-1-eng-US/tyranosaurus-rex-full-length-2460-1384_wideexact_1230.jpg',
        price=510.66,
        size='Large'
    )
    yoshis_Trike_fossil = Product(
        name='Triceratop Fossil',
        description='There is a fossil with the Tricertop called the Yoshis Trike. It was discovered in 2010 in Montana, USA by a person named Yoshi Katsura. The creature was about the size of an african bull elephant and has the longest horns of any specimen discovered so far. There are different specimens of the Triceratops and from this fossil this is one of them.',
        image_url='https://static.dw.com/image/59581750_605.jpg',
        price=310.66,
        size='Large'
    )
    




    db.session.add(t_rex)
    db.session.add(triceratops)
    db.session.add(pterodactyl)
    db.session.add(stegosaurus)
    db.session.add(velociraptor)
    db.session.add(megalodon)
    db.session.add(mammoth)
    db.session.add(ankylosaurus)
    db.session.add(brachiosaurus)
    db.session.add(diplodocus)
    db.session.add(allosaurus)
    db.session.add(plesiosaurus)
    db.session.add(spinosaurus)
    db.session.add(t_rex_fossil)
    db.session.add(yoshis_Trike_fossil)




    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
