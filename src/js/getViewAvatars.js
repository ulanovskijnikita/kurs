import getData from "./getData.js";

export default async function getViewAvatars(event) {
  const avatars = document.body.querySelector("#avatars");
  const avatarInf = document.body.querySelector("#avatarInf");
  const avatarControll = document.body.querySelector("#avatarControll");

  let [{ id: lastId }] = await getData(
    `SELECT id FROM avatars ORDER BY id DESC LIMIT 1`
  );
  let [{ id: firstId }] = await getData(`SELECT id FROM avatars LIMIT 1`);

  let initialId = +firstId;

  angleLeft.addEventListener("click", async function () {
    let currentAvatar = avatars.querySelector(".outline");
    let previousAvatar = currentAvatar.previousElementSibling;
    if (previousAvatar) {
      await previousAvatar.click();
    } else if (currentAvatar.getAttribute('id') !== `avatar-img-${firstId}`) {
      initialId = initialId -5;
      await view(initialId);
      await avatars.lastElementChild.click();
    }
  });

  angleRight.addEventListener("click", async function () {
    let currentAvatar = avatars.querySelector(".outline");
    let nextAvatar = currentAvatar.nextElementSibling;
    if (nextAvatar) {
      await nextAvatar.click();
    } else if (currentAvatar.getAttribute('id') !== `avatar-img-${lastId}`) {
      initialId = initialId + 5;
      await view(initialId);
      await avatars.firstElementChild.click();
    }
  });

  await view(initialId);
  await avatars.firstElementChild.click();

  async function view(initialId) {
    avatarControll.classList.add('opacity-0');
    avatars.classList.add('opacity-0');
    avatarInf.classList.add('opacity-0');
    
    await new Promise((resolve) => {
      setTimeout(resolve, 300);
    });
    avatars.innerHTML = '';
    avatarInf.innerHTML = '';

    avatars.classList.remove('opacity-0');
    avatarInf.classList.remove('opacity-0');
    avatarControll.classList.remove('opacity-0');

    const avatasrData = await getData(
      `SELECT * FROM avatars WHERE id >= ${initialId} LIMIT 5`
    );

    if (Array.isArray(avatasrData)) {

      avatasrData.forEach((data) => {
        avatars.insertAdjacentHTML(
          "beforeend",
          `
              <img tabindex="0" class="cursor-pointer duration-300" id="avatar-img-${data.id}" src="${data.imageSrc}" alt="person-${data.id}">
          `
        );

        avatarInf.insertAdjacentHTML(
          "beforeend",
          `
              <h3 id="avatar-name-${data.id}" class="hidden col-span-2">${data.name}</h3>
              <p id="avatar-inf-${data.id}" class="hidden col-span-3 pt-0">${data.inf}</p>
          `
        );
      });
  
      for (let img of avatars.children) {
        img.addEventListener("click", async function (event) {
          for (let img of avatars.children) {
            img.classList.remove(
              "outline-accent",
              "outline-2",
              "rounded-full",
              "outline"
            );
          }
  
          event.currentTarget.classList.add(
            "outline-accent",
            "outline-2",
            "rounded-full",
            "outline"
          );
          
          for (let node of avatarInf.children) {
            node.classList.add('hidden')
          }
          
          const currentInf = event.currentTarget.getAttribute('id').at(-1);

          

          const angleRight = document.body.querySelector("#angleRight");
          const angleLeft = document.body.querySelector("#angleLeft");
  
          if (angleRight.classList.contains("text-inert")) {
            angleRight.classList.add("cursor-pointer", "active:text-accent");
            angleRight.classList.remove("text-inert");
          }
  
          if (angleLeft.classList.contains("text-inert")) {
            angleLeft.classList.add("cursor-pointer", "active:text-accent");
            angleLeft.classList.remove("text-inert");
          }
  
          if (event.currentTarget.getAttribute("id") === `avatar-img-${lastId}`) {
            angleRight.classList.remove("cursor-pointer", "active:text-accent");
            angleRight.classList.add("text-inert");
          }
  
          if (
            event.currentTarget.getAttribute("id") === `avatar-img-${firstId}`
          ) {
            angleLeft.classList.remove("cursor-pointer", "active:text-accent");
            angleLeft.classList.add("text-inert");
          }

          avatarInf.classList.add('opacity-0');
          
          await new Promise( (resolve) => {
            setTimeout(resolve, 300);
          });
          
          avatarInf.querySelector(`#avatar-name-${currentInf}`).classList.remove('hidden');
          avatarInf.querySelector(`#avatar-inf-${currentInf}`).classList.remove('hidden');
          avatarInf.classList.remove('opacity-0');
        });
      }
  
      
    } else {
      avatars.insertAdjacentHTML(
        "beforeend",
        `
          <p class="col-span-full">${JSON.parse(avatasrData).error}</p>
        `
      );
    }
  }
}