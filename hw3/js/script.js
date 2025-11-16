// Homework 3: Hypixel SkyBlock API - Bazaar Search (Brandon Evans)

// Event listener
document.querySelector("button").addEventListener("click", getBazaarData);

// Call getBazaarItems immediately
getBazaarItems();

// Load Bazaar Items
async function getBazaarItems() {
    // Get Bazaar API data
    let url = `https://api.hypixel.net/v2/skyblock/bazaar`;
    let response = await fetch(url);
    let data = await response.json();

    // Read the key from each object entry
    for (const [key] of Object.entries(data.products)) {
        itemList.innerHTML += `<option> ${key} </option>`;
    }

    // Inform user the searcher is ready!
    document.querySelector("#itemError").innerHTML = "Items loaded!";
    document.querySelector("#itemError").className = "bg-success text-white";
}

// Get Bazaar Data
async function getBazaarData() {
    let item = document.querySelector("#item").value;

    // Get Bazaar API data
    let url = `https://api.hypixel.net/v2/skyblock/bazaar`;
    let response = await fetch(url);
    let data = await response.json();
    
    // Form validation (check if item exists in the bazaar array)
    if (!data.products[item]) {
        clear("This item is not sold on the Bazaar!");
        return; // Return out of the function as nothing more needs to happen.
    }

    // The function will only reach this point if the item is actually found.
    document.querySelector("#itemError").innerHTML = "This item is sold on the Bazaar!";
    document.querySelector("#itemError").className = "bg-success text-white";

    // Check if buy summary is null
    if (data.products[item]["buy_summary"][0]) {
        document.querySelector("#instantBuyPrice").innerHTML = data.products[item]["buy_summary"][0]["pricePerUnit"].toLocaleString() + " coins per unit";
    } else {
        document.querySelector("#instantBuyPrice").innerHTML = "An instant buy cannot be filled on this item right now!";
    }

    document.querySelector("#buyPrice").innerHTML = data.products[item]["quick_status"]["buyPrice"].toLocaleString() + " coins per unit";
    document.querySelector("#buyVolume").innerHTML = data.products[item]["quick_status"]["buyVolume"].toLocaleString() + " units in sell orders";
    document.querySelector("#buyMovingWeek").innerHTML = data.products[item]["quick_status"]["buyMovingWeek"].toLocaleString() + " units bought this week";
    document.querySelector("#buyOrders").innerHTML = data.products[item]["quick_status"]["buyOrders"].toLocaleString() + " orders make up all the available units";

    // Check if sell summary is null
    if (data.products[item]["sell_summary"][0]) {
        document.querySelector("#instantSellPrice").innerHTML = data.products[item]["sell_summary"][0]["pricePerUnit"].toLocaleString() + " coins per unit";
    } else {
        document.querySelector("#instantSellPrice").innerHTML = "An instant sell cannot be filled on this item right now!";
    }

    document.querySelector("#sellPrice").innerHTML = data.products[item]["quick_status"]["sellPrice"].toLocaleString() + " coins per unit";
    document.querySelector("#sellVolume").innerHTML = data.products[item]["quick_status"]["sellVolume"].toLocaleString() + " units in buy orders";
    document.querySelector("#sellMovingWeek").innerHTML = data.products[item]["quick_status"]["sellMovingWeek"].toLocaleString() + " units sold this week";
    document.querySelector("#sellOrders").innerHTML = data.products[item]["quick_status"]["sellOrders"].toLocaleString() + " orders make up all the available units";
}

// Helper function to clear all results. Error parameter is used when an item is not on the Bazaar or does not exist.
function clear(error) {
    document.querySelector("#itemError").innerHTML = error;
    document.querySelector("#itemError").className = "bg-danger text-white";

    document.querySelector("#instantBuyPrice").innerHTML = "";
    document.querySelector("#buyPrice").innerHTML = "";
    document.querySelector("#buyVolume").innerHTML = "";
    document.querySelector("#buyMovingWeek").innerHTML = "";
    document.querySelector("#buyOrders").innerHTML = "";

    document.querySelector("#instantSellPrice").innerHTML = "";
    document.querySelector("#sellPrice").innerHTML = "";
    document.querySelector("#sellVolume").innerHTML = "";
    document.querySelector("#sellMovingWeek").innerHTML = "";
    document.querySelector("#sellOrders").innerHTML = "";
}
