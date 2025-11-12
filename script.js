// DATA MANAGEMENT
// ============================================

// Your app's data structure
// At the top of script.js



let archive = [];

let events = [
    {
        id: 1,
        title: "Summer Music Festival",
        image: "https://media.timeout.com/images/106204051/image.jpg",
        description: "Join us for an amazing summer music festival",
        seats: 100,
        price: 49.99,
        variants: [
            { id: 1, name: "Early Bird", qty: 20, value: 39.99, type: "fixed" },
            { id: 2, name: "Student", qty: 30, value: 20, type: "percentage" }
        ]
    },
    {
        id: 2,
        title: "Tech Conference 2026",
        image: "https://women-in-tech.org/wp-content/uploads/2024/06/womenintech-global-summit-2024.jpg",
        description: "Annual technology conference with industry leaders",
        seats: 200,
        price: 299.99,
        variants: [
            { id: 1, name: "VIP", qty: 50, value: 399.99, type: "fixed" }
        ]
    },
    {
        id: 3,
        title: "Art Exhibition",
        image: "https://bykerwin.com/wp-content/uploads/2024/10/IMG_9839-Large-crypt-main-wall-landscape-wordpress-1024x768.jpeg",
        description: "Contemporary art exhibition featuring local artists",
        seats: 50,
        price: 25.00,
        variants: []
    }
];

// Save/load from localStorage
function loadData() {
    // TODO: Load events and archive from localStorage
    // JSON.parse(localStorage.getItem('events'))
}

function saveData() {
    // TODO: Save events and archive to localStorage
    // localStorage.setItem('events', JSON.stringify(events))
}

// ============================================
// SCREEN SWITCHING
// ============================================




// const atr= document.querySelectorAll('.sidebar__btn')[1].getAttribute("data-screen");

// console.log(atr);
// for(b of bouttons){
//     if(screenId === )
// }


function switchScreen(screenId) {

    const bouttons = document.querySelectorAll('.sidebar__btn');
    const Sections = document.querySelectorAll('.screen');
    for (b of bouttons) {
        b.classList.remove('is-active');
        if (b.getAttribute("data-screen") === screenId.getAttribute('data-screen')) {
            b.classList.add('is-active')
        }
    }
    for (s of Sections) {
        s.classList.remove('is-visible');
        if (s.getAttribute("data-screen") === screenId.getAttribute('data-screen')) {
            s.classList.add('is-visible')
        }
    }



    const title = document.getElementById('page-title');
    const subtitle = document.getElementById('page-subtitle');
    switch (screenId.getAttribute('data-screen')) {
        case 'stats':
            title.innerHTML = 'Statistics';
            subtitle.innerHTML = 'Overview of your events';
            break;
        case 'add':
            title.innerHTML = 'Add Event';
            subtitle.innerHTML = 'Create a new event';
            break;
        case 'list':
            title.innerHTML = 'Events';
            subtitle.innerHTML = 'Manage your events';
            break;
        case 'archive':
            title.innerHTML = 'Archive';
            subtitle.innerHTML = 'Archived events';
            break;
    }
    // TODO:
    // 1. Remove .is-active from all .sidebar__btn
    // 2. Add .is-active to [data-screen="${screenId}"]
    // 3. Remove .is-visible from all .screen
    // 4. Add .is-visible to [data-screen="${screenId}"]
    // 5. Update #page-title and #page-subtitle based on screenId



}

// Listen to sidebar button clicks
// document.querySelectorAll('.sidebar__btn').forEach(btn => {
//     btn.addEventListener('click', () => switchScreen(btn.dataset.screen))
// })

// ============================================
// STATISTICS SCREEN
// ============================================

function renderStats() {
    // TODO:
    // Calculate from events array:
    const totalEvents = events.length;
    const totalSeats = events.reduce((sum, e) => sum + e.seats, 0);
    const totalPrice = events.reduce((sum, e) => sum + e.price * e.seats, 0);

    // Update DOM:
    document.getElementById('stat-total-events').textContent = totalEvents;
    document.getElementById('stat-total-seats').textContent = totalSeats;
    document.getElementById('stat-total-price').textContent = '$' + totalPrice.toFixed(2);
}
renderStats();
// ============================================
// ADD EVENT FORM
// ============================================
const t_regex = /^[a-zA-Z\s]+$/
const img_regex = /^https?:\/\/.*\.(png|jpg|jpeg|gif|bmp|webp|svg)$/
const des_regex = /^[A-Za-z0-9 .,!?'"()\-]{10,300}$/
let id = 3;
function addVariantRow() {
    const varlist = document.getElementById('variants-list')

    const var_row = document.createElement('div');
    var_row.className = 'variant-row'
    var_row.innerHTML = `
        <input type="text" class="input variant-row__name" placeholder="Variant name (e.g., 'Early Bird')" value="">
    <input type="number" class="input variant-row__qty" placeholder="Qty" min="1" value="">
    <input type="number" class="input variant-row__value" placeholder="Value" step="0.01" value="">
    <select class="select variant-row__type">
        <option value="fixed" selected>Fixed Price</option>
        <option value="percentage">Percentage Off</option>
    </select>
    <button type="button" onclick="removeVariantRow(this)" class="btn btn--danger btn--small variant-row__remove">Remove</button>
    `
    varlist.appendChild(var_row);
    // TODO:
    // 1. Clone .variant-row template
    // 2. Append to #variants-list
    // 3. Add remove listener to new row's remove button
}
let editingEventId;
let f = false;
function handleFormSubmit(e) {
    e.preventDefault();
    let tiitle = document.getElementById('event-title').value.trim();
    let url = document.getElementById('event-image').value.trim();
    let descr = document.getElementById('event-description').value.trim();
    let seats = document.getElementById('event-seats').value.trim();
    let price = document.getElementById('event-price').value.trim();

    let newEvent;
    let variantrows = document.querySelectorAll('.variant-row');
    if (!t_regex.test(tiitle)) {
        alert("Please enter a title that contains only alphabetic characters");
        return;
    }
    if (!img_regex.test(url)) {
        alert("Please enter a valid url");
        return;
    }
    if (!des_regex.test(descr)) {
        alert("Please enter a valid event description");
        return;
    }
    if (!seats || parseInt(seats) < 1) {
        alert("Number of seats must be at least 1");
        return;
    }
    if (!price || parseInt(price) < 0) {
        alert("Price must be a positive number");
        return;
    }
    if (f === true) {
        for (let i = 0; i < events.length; i++) {
            if (events[i].id === editingEventId) {
                events[i].title = tiitle;
                events[i].image = url;
                events[i].description = descr;
                events[i].seats = parseInt(seats);
                events[i].price = parseFloat(price);
                // events[i].variants = variants;
                break;
            }
        }
        alert('Event updated successfully!');
        f = false;
    }
    else{   
        id++;
        newEvent = {
            id: id,
            title: tiitle,
            image: url,
            description: descr,
            seats: parseInt(seats),
            price: parseFloat(price),
            variants: [],
        };
        events.push(newEvent);
        alert('Event created successfully!');
    }
    for (let index = 0; index < variantrows.length; index++) {
        newEvent.variants.push(variantrows);
    }
    
    renderStats();
    showevents();
    document.getElementById('event-form').reset();
    document.getElementById('variants-list').innerHTML = '';
    // TODO:
    // 1. Prevent default
    // 2. Validate form inputs
    // 3. If valid: create new event object, add to events array, save data, reset form
    // 4. If invalid: show errors in #form-errors
}

// document.getElementById('event-form').addEventListener('submit', handleFormSubmit)

// document.getElementById('btn-add-variant').addEventListener('click', addVariantRow)
function removeVariantRow(button) {
    button.closest('.variant-row').remove();
    // TODO:
    // Find closest .variant-row and remove it
}

// ============================================
// EVENTS LIST SCREEN
// ============================================

function showevents(){
    const body = document.querySelector('.table__body');
    body.innerHTML = ''
    
    for (let index = 0; index < events.length; index++) {
        body.innerHTML += `                                
        <tr class="table__row" data-event-id="${events[index].id}">
            <td>${events[index].id}</td>
            <td>${events[index].title}</td>
            <td>${events[index].seats}</td>
            <td>$${events[index].price}</td>
            <td><span class="badge">${events[index].variants.length}</span></td>
            <td>
                <button onclick="showEventDetails(this)" class="btn btn--small" data-action="details" data-event-id="${events[index].id}">Details</button>
                <button onclick="editEvent(this)" class="btn btn--small" data-action="edit" data-event-id="${events[index].id}">Edit</button>
                <button onclick="archiveEvent(this)" class="btn btn--danger btn--small" data-action="archive" data-event-id="${events[index].id}">Delete</button>
            </td>
        </tr>`;
    }
}
showevents();
function renderEventsTable(eventList, page = 1, perPage = 10) {

    // TODO:
    // 1. Paginate eventList by page and perPage
    // 2. Generate table rows for each event
    // 3. Add data-event-id to each row
    // 4. Inject into #events-table tbody
    // 5. Call renderPagination()
}

function renderPagination(totalItems, currentPage, perPage) {
    // TODO:
    // Calculate total pages
    // Generate pagination buttons
    // Add .is-active to current page
    // Add .is-disabled to prev/next if at boundary
    // Inject into #events-pagination
}

function handleTableActionClick(e) {
    // TODO:
    // 1. Check if e.target is [data-action]
    // 2. Get action and eventId from attributes
    // 3. Call appropriate function (showDetails, editEvent, archiveEvent)
    // Use event delegation on #events-table
}

// document.getElementById('events-table').addEventListener('click', handleTableActionClick)

function showEventDetails(eventId) {
    ev_id = parseInt(eventId.getAttribute('data-event-id'));
    console.log(ev_id)
    let event;
    for (let i = 0; i < events.length; i++) {
        if (events[i].id === ev_id) {
            event = events[i];
        }
    }
    console.log(event);
    const d = document.createElement('div');
    d.innerHTML = ``
    const modal = document.getElementById('event-modal');
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <h2>${event.title}</h2>
        <p>${event.description}</p>
        <img width="500" src="${event.image}" alt="${event.title}">
        `
    modal.classList.remove('is-hidden');
    console.log(modal);
    document.querySelector('.modal__close').addEventListener("click", function(){
        modal.classList.add('is-hidden');
    })
    // TODO:
    // 1. Find event by id in events array
    // 2. Populate #modal-body with event details
    // 3. Remove .is-hidden from #event-modal
}


function editEvent(eventId) {
    ev_id = parseInt(eventId.getAttribute('data-event-id'));
    let event;
    for (let i = 0; i < events.length; i++) {
        if (events[i].id === ev_id) {
            event = events[i];
        }
    }
    f = true;
    editingEventId = ev_id;
  
    document.getElementById('event-title').value = event.title;
    document.getElementById('event-image').value = event.image;
    document.getElementById('event-description').value = event.description;
    document.getElementById('event-seats').value = event.seats;
    document.getElementById('event-price').value = event.price;
    
    const addButton = document.querySelector('[data-screen="add"]');
    switchScreen(addButton);
    // TODO:
    // 1. Find event by id
    // 2. Populate form fields with event data
    // 3. Switch to 'add' screen
    // 4. On submit, update existing event instead of creating new
}

function archiveEvent(eventId) {
    ev_id = parseInt(eventId.getAttribute('data-event-id'));
    console.log(ev_id)
    let event;
    let index;
    for (let i = 0; i < events.length; i++) {
        if (events[i].id === ev_id) {
            event = events[i];
            index = i;
            break;
        }
        
    }
    // console.log(event);
    archive.push(event);
    events.splice(index, 1)
    showevents();
    console.log(archive);
    // TODO:
    // 1. Find event by id in events
    // 2. Move to archive array
    // 3. Remove from events array
    // 4. Save data
    // 5. Re-render table
}

// ============================================
// ARCHIVE SCREEN
// ============================================

function renderArchiveTable(archivedList) {
    // TODO:
    // Similar to renderEventsTable but read-only
    // Show "Restore" button instead of "Edit"/"Delete"
}

function restoreEvent(eventId) {
    // TODO:
    // 1. Find event by id in archive
    // 2. Move back to events array
    // 3. Remove from archive
    // 4. Save data
    // 5. Re-render both tables
}

// ============================================
// MODAL
// ============================================

function openModal(title, content) {
    // TODO:
    // 1. Set #modal-title
    // 2. Set #modal-body content
    // 3. Remove .is-hidden from #event-modal
}

function closeModal() {
    // TODO:
    // Add .is-hidden to #event-modal
}

// Listen to close button and overlay click
// document.getElementById('event-modal').addEventListener('click', (e) => {
//     if (e.target.dataset.action === 'close-modal' || e.target.classList.contains('modal__overlay')) {
//         closeModal()
//     }
// })

// ============================================
// SEARCH & SORT
// ============================================

function searchEvents() {
    const input = document.getElementById('search-events');
    
    input.addEventListener('input', function() {
        const search = input.value
        const tableRows = document.querySelectorAll('#events-table .table__body tr');
        
        tableRows.forEach(function(row) {
            const title = row.querySelector('td:nth-child(2)').textContent
            
            if (title.includes(search)) {
                row.style.display = '';  
            } else {
                row.style.display = 'none';  
            }
        });
    });
}

// Call it once on page load
searchEvents();

function sortEvents(eventList, sortType) {
    // TODO:
    // Sort by: title-asc, title-desc, price-asc, price-desc, seats-asc
    // Return sorted array
}

// Listen to search and sort changes
// document.getElementById('search-events').addEventListener('input', (e) => {
//     const filtered = searchEvents(e.target.value)
//     renderEventsTable(filtered)
// })

// document.getElementById('sort-events').addEventListener('change', (e) => {
//     const sorted = sortEvents(events, e.target.value)
//     renderEventsTable(sorted)
// })

// ============================================
// INITIALIZATION
// ============================================

function init() {
    // TODO:
    // 1. Load data from localStorage
    // 2. Render initial screen (statistics)
    // 3. Set up all event listeners
    // 4. Call renderStats(), renderEventsTable(), renderArchiveTable()
}

// Call on page load
// document.addEventListener('DOMContentLoaded', init)
