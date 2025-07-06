const { sequelize, User, Post, Comment, Tag, PostImage } = require("./models");

async function seed() {
  await sequelize.sync({ force: true });

  const user1 = await User.create({
    nickName: "luna",
    email: "luna@example.com",
  });
  const user2 = await User.create({
    nickName: "sol",
    email: "sol@example.com",
  });
  const user3 = await User.create({
    nickName: "joaquin salvador",
    email: "joaquin@example.com",
  });
  const user4 = await User.create({
    nickName: "valentina alvarez",
    email: "valentina@example.com",
  });

  const tag1 = await Tag.create({ name: "trekking" });
  const tag2 = await Tag.create({ name: "unahur" });
  const tag3 = await Tag.create({ name: "diversión" });
  const tag4 = await Tag.create({ name: "vacaciones" });
  const tag5 = await Tag.create({ name: "playa" });
  const tag6 = await Tag.create({ name: "programación" });
  const tag7 = await Tag.create({ name: "running" });

  const post1 = await Post.create({
    description: "Mi primer post",
    UserId: user1.id,
  });
  const post2 = await Post.create({
    description: "Reflexiones nocturnas",
    UserId: user2.id,
  });
  const post3 = await Post.create({
    description: "Conociendo hermosas ciudades",
    UserId: user3.id,
  });
  const post4 = await Post.create({
    description: "A entrenar",
    UserId: user4.id,
  });
  const post5 = await Post.create({
    description: "En la naturaleza",
    UserId: user1.id,
  });
  const post6 = await Post.create({
    description: "Mucho sol, playa y descanso",
    UserId: user2.id,
  });
  const post7 = await Post.create({
    description: "Amo Bariloche nevada",
    UserId: user1.id,
  });
  const post8 = await Post.create({
    description: "Leyendo un libro",
    UserId: user2.id,
  });
  const post9 = await Post.create({
    description: "10km en montaña",
    UserId: user3.id,
  });
  const post10 = await Post.create({
    description: "Hermoso dia para no salir de casa",
    UserId: user2.id,
  });
  const post11 = await Post.create({
    description: "Pizza y cervaza con amigos",
    UserId: user1.id,
  });
  const post12 = await Post.create({
    description: "En la clase de CIU",
    UserId: user4.id,
  });

  await post1.setTags([tag3]);
  await post3.setTags([tag4]);
  await post4.setTags([tag7, tag4]);
  await post5.setTags([tag1, tag4, tag3]);
  await post6.setTags([tag4, tag5]);
  await post7.setTags([tag4, tag3]);
  await post8.setTags([tag2, tag6]);
  await post9.setTags([tag7, tag1]);
  await post11.setTags([tag3]);
  await post12.setTags([tag2, tag6]);

  await Comment.create({
    content: "Muy bueno!",
    UserId: user2.id,
    PostId: post1.id,
  });
  await Comment.create({
    content: "Amo!",
    UserId: user3.id,
    PostId: post7.id,
  });
  await Comment.create({
    content: "Genial!",
    UserId: user4.id,
    PostId: post4.id,
  });
  await Comment.create({
    content: "Gracias por compartir",
    UserId: user1.id,
    PostId: post2.id,
  });
  await Comment.create({
    content: "Que rico!",
    UserId: user2.id,
    PostId: post11.id,
  });
  await Comment.create({
    content: "¡Acordate del protector solar!",
    UserId: user3.id,
    PostId: post6.id,
  });
  await Comment.create({
    content: "La próxima me sumo",
    UserId: user4.id,
    PostId: post9.id,
  });
  await Comment.create({
    content: "¿Hace cuanto tiempo asistis?",
    UserId: user3.id,
    PostId: post12.id,
  });
  await Comment.create({
    content: "Me encanta!",
    UserId: user2.id,
    PostId: post8.id,
  });
  await Comment.create({
    content: "Vamos por más!",
    UserId: user1.id,
    PostId: post4.id,
  });
  await Comment.create({
    content: "A mi me encantó también!",
    UserId: user1.id,
    PostId: post3.id,
  });
  await Comment.create({
    content: "¿Te gustó?",
    UserId: user1.id,
    PostId: post11.id,
  });
  await PostImage.bulkCreate([
    {
      url: "https://cdn.pixabay.com/photo/2025/06/15/04/46/duckling-9660597_1280.jpg",
      PostId: post1.id,
    },
    {
      url: "https://cdn.pixabay.com/photo/2022/05/20/13/29/dogs-7209506_1280.jpg",
      PostId: post1.id,
    },
    {
      url: "https://cdn.pixabay.com/photo/2020/04/18/18/12/portrait-5060365_1280.jpg",
      PostId: post2.id,
    },
    {
      url: "https://cdn.pixabay.com/photo/2016/11/23/15/31/man-1853545_1280.jpg",
      PostId: post2.id,
    },
    {
      url: "https://cdn.pixabay.com/photo/2023/01/15/22/48/river-7721287_1280.jpg",
      PostId: post3.id,
    },
    {
      url: "https://cdn.pixabay.com/photo/2024/12/26/21/04/firenze-9292733_1280.jpg",
      PostId: post3.id,
    },
    {
      url: "https://cdn.pixabay.com/photo/2021/11/05/19/01/cappadocia-6771879_1280.jpg",
      PostId: post5.id,
    },
    {
      url: "https://cdn.pixabay.com/photo/2018/09/18/16/45/forest-3686632_640.jpg",
      PostId: post5.id,
    },
    {
      url: "https://cdn.pixabay.com/photo/2017/04/05/20/58/running-2206296_1280.jpg",
      PostId: post4.id,
    },
    {
      url: "https://cdn.pixabay.com/photo/2024/12/18/01/27/lightning-9274136_1280.jpg",
      PostId: post10.id,
    },
    {
      url: "https://cdn.pixabay.com/photo/2022/10/11/18/53/autumn-7514966_640.jpg",
      PostId: post9.id,
    },
    {
      url: "https://cdn.pixabay.com/photo/2024/08/31/06/24/river-9010602_1280.jpg",
      PostId: post3.id,
    },
    {
      url: "https://cdn.pixabay.com/photo/2025/05/30/17/15/mountain-9631829_1280.jpg",
      PostId: post9.id,
    },
    {
      url: "https://cdn.pixabay.com/photo/2024/01/25/12/30/mountain-8531778_1280.jpg",
      PostId: post9.id,
    },
    {
      url: "https://cdn.pixabay.com/photo/2022/11/02/12/30/islands-7564775_1280.jpg",
      PostId: post6.id,
    },
    {
      url: "https://cdn.pixabay.com/photo/2024/09/03/18/03/sand-9019849_1280.jpg",
      PostId: post6.id,
    },
    {
      url: "https://cdn.pixabay.com/photo/2019/05/04/14/22/woman-4178187_1280.jpg",
      PostId: post8.id,
    },
    {
      url: "https://cdn.pixabay.com/photo/2015/09/05/21/51/reading-925589_1280.jpg",
      PostId: post8.id,
    },
    {
      url: "https://cdn.pixabay.com/photo/2023/09/26/20/05/tomatoes-8278168_1280.jpg",
      PostId: post11.id,
    },
    {
      url: "https://cdn.pixabay.com/photo/2025/05/17/04/39/snapshot-9604947_1280.jpg",
      PostId: post11.id,
    },
    {
      url: "https://cdn.pixabay.com/photo/2020/09/02/06/26/pub-5537449_1280.jpg",
      PostId: post11.id,
    },
    {
      url: "https://cdn.pixabay.com/photo/2021/02/18/12/03/people-6027028_1280.jpg",
      PostId: post12.id,
    },
    {
      url: "https://cdn.pixabay.com/photo/2017/03/04/12/15/programming-2115930_1280.jpg",
      PostId: post12.id,
    },
    {
      url: "https://cdn.pixabay.com/photo/2020/09/27/13/15/data-5606639_1280.jpg",
      PostId: post12.id,
    },
    {
      url: "https://cdn.pixabay.com/photo/2018/08/10/15/43/woman-3597095_1280.jpg",
      PostId: post12.id,
    },
    {
      url: "https://cdn.pixabay.com/photo/2015/04/20/13/12/little-boy-731165_1280.jpg",
      PostId: post10.id,
    },
    {
      url: "https://cdn.pixabay.com/photo/2020/01/21/11/39/running-4782722_1280.jpg",
      PostId: post4.id,
    },
    {
      url: "https://cdn.pixabay.com/photo/2020/02/25/11/46/snowboarding-4878696_640.jpg",
      PostId: post7.id,
    },
    {
      url: "https://cdn.pixabay.com/photo/2019/12/14/15/05/mountains-4695049_1280.jpg",
      PostId: post7.id,
    },
  ]);

  console.log("Base de datos poblada!");
  process.exit();
}

seed();
