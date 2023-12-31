
const data = require('./state.json')
const TelegramBot = require('node-telegram-bot-api')
const token = '6649387821:AAGOxjhPOCVV2CbX6K4AW7ezCylvH_lZty0'
const bot = new TelegramBot(token, {polling: true,})


/*  Default commands for the bot  */
const commands =[
    {command: "/help", description: "List all the available commands"},
    {command: "/menu", description: "Show current Maomi menu"}
]

/*  Keyboard markup for the menu  */
const menuOptions = {
    reply_markup: JSON.stringify(
        {
            resize_keyboard: true,
            keyboard: [
                [
                {text: 'Get hot drinks'},
                {text: 'Get cold drinks'},
                {text: 'Get special drinks'}
            ],
            [
                {text: 'Get schedule'}
            ]
            ]
    })
}
const menuOptionsMedia = [
    {
        type: 'photo',
        media: './assets/ice-bubble-menu.jpg'
    },
    {
        type: 'photo',
        media: './assets/general-menu.jpg'
    },
    {
        type: 'photo',
        media: './assets/special-menu.png',
        caption: '*🔧 Customizable 🔧:* \n' +
                    '\n\t\t * — 📐 Size 📐* \\- There **are** two sizes available: Small 500ml and Large 700ml\\.' +
                    '\n\t\t * — 🌡 Temperature 🌡* \\- Choose between hot and cold drinks \\(ice bubble tea is only available in cold\\)\\.' +
                    '\n\t\t * — 🍭 Sweetness 🍭* \\- Choose between 5 levels of sweetness from 0 \\(no sugar at all\\) to 4 \\(if you like it very sweet\\)\\.' +
                    '\n\t\t * — 🧋 Caramel 🧋* \\- Choose between 4 levels of caramel 1 \\-\\> 4\\. 1 is less, 4 is more\\. ' +
                    '\n\t\t * — 🥛 Milk 🥛* \\- Choose between regular and lactose\\-free milk\\.',
        parse_mode: 'MarkdownV2'
    }
]
const scheduleMediaOpen = [
    {
        type: 'photo',
        media: 'https://i.imgur.com/VI0MujW.jpg?1'
    }
]
const scheduleMediaClosed= [
    {
        type: 'photo',
        media: 'https://i.imgur.com/leTo72y.jpg?1'
    }
]
const currentDate = new Date();

const lowerThreshold = new Date(currentDate);
lowerThreshold.setHours(11, 0, 0, 0);

const upperThreshold = new Date(currentDate);
upperThreshold.setHours(20, 30, 0, 0);

const checkSchedule = () => {
    const date = new Date();
    if(date>lowerThreshold && date<upperThreshold){
        return scheduleMediaOpen
    }else
        return scheduleMediaClosed
}


/*  Keyboard markup for the hot drinks  */
const hotDrinksList = data.menu.regular
const hotDrinksMenu = hotDrinksList.map(drink => {
    return{text: drink.name}
})
const hotDrinks = {
    reply_markup: JSON.stringify(
        {
            resize_keyboard: true,
            keyboard:[
                    hotDrinksMenu.slice(0,4),
                    hotDrinksMenu.slice(4),
                [
                    {text: `Return to the menu`}
                ]
            ]}
    )
}
const hotDrinksMedia = hotDrinksList.map((drink, index) => {
    return{type: 'photo', media: drink.link,
        caption: index===0?'*Hot\\/ Cold drinks available:* \n' +
            '\t\t\n *🟨🟨 Classic Milk Tea \\(HOT🔥\\/ COLD❄️\\)* \n —  4 types of tea, mixed with milk: Oolong, Asam, Jasmine, Earl Gray\\. Choose between 5 levels of caramel from 0 to 4\\.' +
            '\t\t\n *⬜️⬜️ Coco Milk \\(HOT🔥\\/ COLD❄️\\)* \n —  Cocoa powder  mixed with milk and sugar, choose the sweetness from 0 to 4\\.' +
            '\t\t\n *🟪🟪 Taro Milk \\(HOT🔥\\/ COLD❄️\\)* \n —  Taro powder mixed with milk and sugar, choose thw sweetness from 0 to 4\\.' +
            '\t\t\n *🟩🟩 Matcha Milk \\(HOT🔥\\/ COLD❄️\\)* \n —  Matcha green tea mixed with milk and sugar, choose the sweetness from 0 to 4\\.' +
            '\t\t\n *🟨🟧 Milk Tea Brown Sugar \\(HOT🔥\\/ COLD❄️\\)* \n —  Tea mixed with milk and brown sugar\\.' +
            '\t\t\n *🟫🟧 Brown Sugar Late \\(HOT🔥\\/ COLD❄️\\)* \n —  Espresso mixed with milk and brown sugar\\.' +
            '\t\t\n *🟫⬜️ Sea Salt Late \\(HOT🔥\\/ COLD❄️\\)* \n —  Espresso mixed with milk and sea salt\\. ':'',
        parse_mode: 'MarkdownV2'}
})


/*  Keyboard markups for the cold drinks  */
const coldDrinksList = data.menu.ice_bubble
const coldDrinks = {
    reply_markup: JSON.stringify(
        {
            resize_keyboard: true,
            keyboard:[
                [
                    {text: `Return to the menu`}
                ]
            ]}
    )
}
const coldDrinksMedia = coldDrinksList.map((drink, index) => {
    return{type: 'photo', media: drink.link,
        caption: index===0?'* Fresh fruity drinks with different flavours for you to choose* \n' +
            '\n\t\t ★ Boba flavours 🫐:' +
            '\n\t\t\t\t — Strawberry \n\t\t\t\t — Peach \n\t\t\t\t — Lychee \n\t\t\t\t — Passion Fruit \n\t\t\t\t — Tropical Jolly \n\t\t\t\t — Alloe \n\t\t\t\t — Apple \n\t\t\t\t — Pineapple \n\t\t\t\t — Pitahaya \n\t\t\t\t — Mango \n\t\t\t\t — Watermelon \n\t\t\t\t — Lime \\. ' +
            '\n\t\t ★ Syrup flavours 🧃:' +
            '\n\t\t\t\t — Strawberry \n\t\t\t\t — Mango \n\t\t\t\t — Cherry \n\t\t\t\t — Peach \n\t\t\t\t — Lychee \n\t\t\t\t — Watermelon \n\t\t\t\t — White peach \n\t\t\t\t — Melon \n\t\t\t\t — Apple \n\t\t\t\t — Kiwi \n\t\t\t\t — Pineapple \n\t\t\t\t — Blueberry \n\t\t\t\t — Raspberry \n\t\t\t\t — Passion Fruit \n\t\t\t\t — Kumquat\\-lemon \\. ':'',
        parse_mode: 'MarkdownV2'}
})

/*  Keyboard markup for all drinks  */
const specialDrinksList = data.menu.special
const specialDrinksMedia = specialDrinksList.map((drink, index) => {
    return{
        type: 'photo', media: drink.link,
        caption: index===0?'* Special winter menu: *\n' +
            '\n\t\t — 🟪🟪Taro Late \\(HOT🔥\\/ COLD❄️\\) \\- Taro powder mixed with late\\.' +
            '\n\t\t — 🟫⬜️Spicy Late \\(HOT🔥\\/ COLD❄️\\) \\- Spicy syrup with cinnamon and chilly mixed with late\\. ' +
            '\n\t\t — 🟧⬜️Asam Gingerbread \\(HOT🔥\\/ COLD❄️\\) \\- Asam tea with Gingerbread syrup and tapioca\\.' +
            '\n\t\t — 🟫🟫Bubble Cacao \\(HOT🔥\\/ COLD❄️\\) \\- Chocolaty cacao with tapioca\\. ':'',
        parse_mode: 'MarkdownV2'
    }
})
const specialDrinksMenu = specialDrinksList.map((drink) => {
    return{text: drink.name}
})
const specialDrinks = {
    reply_markup: JSON.stringify(
        {
            resize_keyboard: true,
            keyboard:[
                    specialDrinksMenu.slice(0, 3),
                [
                    {text: `Return to the menu`}
                ]
            ]}
    )
}


bot.setMyCommands(commands)
const commandsList = commands.map(com => {
    return `\n${com.command} - ${com.description} `
})



bot.on('message', async (msg) =>{
    const chatId = msg.chat.id;
    const messageText = msg.text;

    const sendHotDrink = async (index) => {
        const hotDrink = hotDrinksList[index];
        await bot.sendPhoto(chatId, hotDrink.link, {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: JSON.stringify(hotDrink.name) , url: hotDrink.order }],
                ],
            }),
        });
    };


    switch (msg.text){
        case "/start": {
            await bot.sendMessage(chatId, `Welcome to Maomi Bubble Cafe bot, /help for commands list.`);
            break
        }
        case "/help": {
            await bot.sendMessage(chatId, commandsList.toString())
            break
        }
        case "/menu": {
            await bot.sendMessage(chatId, 'Menu:', menuOptions)
            await bot.sendMediaGroup(chatId, menuOptionsMedia)
            break
        }
        case "Return to the menu":{
            await bot.sendMessage(chatId, 'Menu:', menuOptions)
            await bot.sendMediaGroup(chatId, menuOptionsMedia)
            break
        }
        case "Get schedule": {
            await bot.sendMessage(chatId, "Schedule:")
            await bot.sendMediaGroup(chatId, checkSchedule())
            break
        }
        case "Get hot drinks":{
            await bot.sendMessage(chatId,"Here are hot drinks available:", hotDrinks)
            await bot.sendMediaGroup(chatId, hotDrinksMedia)
            break
        }
        case "Get cold drinks":{
            await bot.sendMessage(chatId, "Cold drinks:", coldDrinks)
            await bot.sendMediaGroup(chatId, coldDrinksMedia)
            break
        }
        case "Get special drinks":{
            await bot.sendMessage(chatId, "Special drinks:", specialDrinks)
            await bot.sendMediaGroup(chatId, specialDrinksMedia)
            break
        }
        case hotDrinksList[0].name: {
            await sendHotDrink(0);
            break;
        }
        case hotDrinksList[1].name: {
            await sendHotDrink(1);
            break;
        }
        case hotDrinksList[2].name: {
            await sendHotDrink(2);
            break;
        }
        case hotDrinksList[3].name: {
            await sendHotDrink(3);
            break;
        }
        case hotDrinksList[4].name: {
            await sendHotDrink(4);
            break;
        }
        case hotDrinksList[5].name: {
            await sendHotDrink(5);
            break;
        }
        case hotDrinksList[6].name: {
            await sendHotDrink(6);
            break;
        }

        default:{
            await bot.sendMessage(chatId, "I dont understand you.")
        }
    }
})
