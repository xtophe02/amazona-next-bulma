import bcrypt from 'bcryptjs';
export const data = {
  users: [
    {
      name: 'Christophe Moreira',
      email: 'eng.christophe.moreira@gmail.com',
      password: bcrypt.hashSync('fcportu'),
      isAdmin: true,
    },
    {
      name: 'Idalia Santos',
      email: 'idalia.santos@outlook.com',
      password: bcrypt.hashSync('fcportu'),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: 'lamborghini sian',
      slug: 'lamborghini-sian',
      category: 'cars',
      image:
        'https://images.unsplash.com/photo-1570280406792-bf58b7c59247?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1724&q=80',
      brand: 'lamborghini',
      price: 2640000,
      rating: 4.8,
      numReviews: 10,
      countInStock: 2,
      description:
        'The Lamborghini Sián FKP 37 is a mid-engine hybrid sports car produced by the Italian automotive manufacturer Lamborghini. Unveiled online on 3 September 2019, the Sián is the first hybrid production vehicle produced by the brand.',
    },
    {
      name: 'Ferrari F8',
      slug: 'ferrari-f8',
      category: 'cars',
      image:
        'https://images.unsplash.com/photo-1592198084033-aade902d1aae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
      brand: 'ferrari',
      price: 276550,
      rating: 4.5,
      numReviews: 8,
      countInStock: 4,
      description:
        'The Ferrari F8 (Type F142MFL) is a mid-engine sports car produced by the Italian automobile manufacturer Ferrari. The car is the successor to the Ferrari 488, with notable exterior and performance changes. It was unveiled at the 2019 Geneva Motor Show.',
    },
    {
      name: 'ducati panigale',
      slug: 'ducati-panigale',
      category: 'motos',
      image:
        'https://images.unsplash.com/photo-1632157256369-cdb4c6a92891?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80',
      brand: 'ducati',
      price: 22295,
      rating: 4.2,
      numReviews: 18,
      countInStock: 7,
      description:
        'The Ducati Panigale V4 is a sport bike with a 1,103 cc (67.3 cu in) desmodromic 90° V4 engine introduced by Ducati in 2018 as the successor to the V-twin engined 1299. A smaller engine displacement version complies with the Superbike category competition regulations which state "Over 750 cc up to 1000 cc" for three and four cylinder 4-stroke engines',
    },
    {
      name: 'harley davidson iron 883',
      slug: 'harley-davidson-iron-883',
      category: 'motos',
      image:
        'https://images.unsplash.com/photo-1623096174892-7821e1861523?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
      brand: 'harley',
      price: 9899,
      rating: 4.1,
      numReviews: 11,
      countInStock: 11,
      description:
        'Authentic Harley-Davidson style through and through, dripping with power. The rubber-mounted 883cc Evolution® engine runs hard and rides smooth for thousands of miles so you can just worry about taking in the freedom of boulevards and back streets.',
    },
    {
      name: 'Mercedes AMG GT-R V8',
      slug: 'mercedes-amg-gt-r-v8',
      category: 'cars',
      image:
        'https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1725&q=80',
      brand: 'mercedes',
      price: 165600,
      rating: 4.6,
      numReviews: 21,
      countInStock: 8,
      description:
        'The Mercedes-AMG GT (C190 / R190) is a grand tourer produced in coupé and roadster bodystyles by German automobile manufacturer Mercedes-AMG. The car was introduced on 9 September 2014 and was officially unveiled to the public in October 2014 at the Paris Motor Show.[4] After the SLS AMG, it is the second sports car developed entirely in-house by Mercedes-AMG. The Mercedes-AMG GT went on sale in two variants (GT and GT S) in March 2015, while a GT3 racing variant of the car was introduced in 2015. A high performance variant called the GT R was introduced in 2016. A GT4 racing variant, targeted at semi-professional drivers and based on the GT R variant, was introduced in 2017. Recently, a new variant called the AMG GT Black series has been released. All variants are assembled at the Mercedes-Benz plant in Sindelfingen, Germany.',
    },
  ],
};
