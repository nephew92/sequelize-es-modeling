import { Site, User } from "./db/models";

(async () => {
  try {

    const joao = await User.create({
      firstName: 'Joao',
      lastName: 'Coriolano'
    })

    const maria = await User.create({
      active: false,
      firstName: 'Maria',
      lastName: 'Iraci'
    })

    const site = await Site.create({ title: 'Shop' })

    await joao.setSite(site)

    {
      const usersActive = await User.scope('limited', 'actives').findAll()
      const usersSite = await User.scope('limited', 'withSites').findAll()
      const users = await User.scope('limited').findAll()
      console.log(JSON.stringify({ users, usersActive, usersSite }, null, 2))
    }


    // await joao.destroy()
    // await site.destroy()

  } catch (error) {
    console.log(error);
  }

})()
