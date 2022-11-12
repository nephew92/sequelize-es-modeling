import { User } from "./db/models";
import Site from "./db/models/site";

(async () => {
  try {

    const joao = new User({
      firstName: 'Joao',
      lastName: 'Coriolano'
    })
    const site = new Site({ title: 'Shop' })


    await joao.save()
    await site.save()

    await joao.setSite(site)

    console.log(joao.get())

    await joao.destroy()
    await site.destroy()

  } catch (error) {
    console.log(error);
  }

})()
