let menuItems = [
  {
    id: 1,
    name: "Veg Burger",
    price: 120,
    category: "Fast Food",
  },
  {
    id: 2,
    name: "Pizza",
    price: 250,
    category: "Italian",
  },
];

// ------------------------------
// Validation Function
// ------------------------------
const validateMenu = (body) => {
  const { name, price, category } = body;

  if (!name || typeof name !== "string") {
    return "Name is required and must be a string.";
  }

  if (price === undefined || typeof price !== "number" || price <= 0) {
    return "Price must be a positive number.";
  }

  if (!category || typeof category !== "string") {
    return "Category is required and must be a string.";
  }

  return null;
};

// ------------------------------
// GET ALL
// ------------------------------
const getAll = (req, res) => {
  res.status(200).json(menuItems);
};

// ------------------------------
// GET BY ID
// ------------------------------
const getById = (req, res) => {
  const id = Number(req.params.id);

  const item = menuItems.find((menu) => menu.id === id);

  if (!item) {
    return res.status(404).json({
      success: false,
      message: "Menu item not found.",
    });
  }

  res.status(200).json(item);
};

// ------------------------------
// CREATE
// ------------------------------
const create = (req, res) => {
  const error = validateMenu(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }

  const { name, price, category } = req.body;

  const newItem = {
    id: menuItems.length + 1,
    name,
    price,
    category,
  };

  menuItems.push(newItem);

  res.status(201).json({
    success: true,
    message: "Menu item created successfully.",
    data: newItem,
  });
};

// ------------------------------
// UPDATE
// ------------------------------
const update = (req, res) => {
  const id = Number(req.params.id);

  const item = menuItems.find((menu) => menu.id === id);

  if (!item) {
    return res.status(404).json({
      success: false,
      message: "Menu item not found.",
    });
  }

  const error = validateMenu(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }

  item.name = req.body.name;
  item.price = req.body.price;
  item.category = req.body.category;

  res.status(200).json({
    success: true,
    message: "Menu item updated successfully.",
    data: item,
  });
};

// ------------------------------
// DELETE
// ------------------------------
const deleteItem = (req, res) => {
  const id = Number(req.params.id);

  const index = menuItems.findIndex((menu) => menu.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Menu item not found.",
    });
  }

  const deletedItem = menuItems.splice(index, 1);

  res.status(200).json({
    success: true,
    message: "Menu item deleted successfully.",
    data: deletedItem[0],
  });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: deleteItem,
};
