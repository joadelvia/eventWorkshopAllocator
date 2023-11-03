const Workshop = require('../models/workshop');

// Controlador para obtener todos los talleres
const getWorkshops = async (req, res) => {
  try {
    const workshops = await Workshop.find();
    res.json(workshops);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener talleres' });
  }
};

// Controlador para crear un nuevo taller
const createWorkshop = async (req, res) => {
  const { name, description, totalCapacity, groups } = req.body;

  // Calcula la suma de los cupos de los grupos
  const totalGroupCapacity = groups.reduce((total, group) => total + group.capacity, 0);

  if (totalGroupCapacity > totalCapacity) {
    return res.status(400).json({ error: 'La suma de los cupos de los grupos no puede superar la capacidad total del taller' });
  }

  try {
    const workshop = new Workshop({
      name,
      description,
      totalCapacity,
      groups,
    });

    await workshop.save();
    res.status(201).json(workshop);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el taller' });
  }
};

// Controlador para actualizar un taller por su ID
const updateWorkshop = async (req, res) => {
  const workshopId = req.params.id;
  const { name, description, totalCapacity, groups } = req.body;

  // Calcula la suma de los cupos de los grupos
  const totalGroupCapacity = groups.reduce((total, group) => total + group.capacity, 0);

  if (totalGroupCapacity > totalCapacity) {
    return res.status(400).json({ error: 'La suma de los cupos de los grupos no puede superar la capacidad total del taller' });
  }
  
  try {
    const workshop = await Workshop.findById(workshopId);

    if (!workshop) {
      return res.status(404).json({ error: 'Taller no encontrado' });
    }

    workshop.name = name;
    workshop.description = description;
    workshop.totalCapacity = totalCapacity;
    workshop.groups = groups;

    await workshop.save();
    res.json(workshop);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el taller' });
  }
};

// Controlador para eliminar un taller por su ID
const deleteWorkshop = async (req, res) => {
  const workshopId = req.params.id;

  try {
    const workshop = await Workshop.findByIdAndDelete(workshopId);

    if (!workshop) {
      return res.status(404).json({ error: 'Taller no encontrado' });
    }

    res.json({ message: 'Taller eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el taller' });
  }
};

module.exports = {
  getWorkshops,
  createWorkshop,
  updateWorkshop,
  deleteWorkshop,
};
