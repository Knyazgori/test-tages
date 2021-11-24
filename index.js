const fetch = require("node-fetch");

async function getInfo() {
  const infoArray = [
    await fetch('http://jsonplaceholder.typicode.com/users'),
    await fetch('http://jsonplaceholder.typicode.com/posts'),
  ]
  const data = await Promise.all(infoArray)
  const usersArray = await data[0].json();
  const postsArray = await data[1].json();
  const newUsersArray = await usersArray.map((el, i) => {
    return obj1 = {
      id: el.id,
      name: el.name,
      email: el.email,
      address: `${el.address.city}, ${el.address.street}, ${el.address.suite}`,
      website: `https://${el.website}`,
      company: el.company.name,
      posts: [],
      posts1: postsArray
        .filter((el) => el.userId === (i + 1))
        .map(async (el, i) => {
          
          const response = await fetch(`http://jsonplaceholder.typicode.com/posts/${i}/comments`);
          const data = await response.json();
          el = { id: el.id, title: el.title, title_crop: `${el.title.slice(0, 20)}...`, body: `${el.body}`, comments: data };
          return el;
        })
        .map((el) => el
          .then(data => {
            newUsersArray[i].posts.push(data)
          })
          .catch(err => err)
        )
    }
  })

  for (let i = 0; i < newUsersArray.length; i = i + 1) {
    const some = await Promise.all(newUsersArray[i].posts1)
    delete newUsersArray[i].posts1
  }

  console.log(newUsersArray);

}
getInfo();
