const Workshop = require('../models/workshop');
const User = require('../models/usuario');

// Controlador para que los usuarios se apunten a talleres
const registerUserToWorkshop = async (req, res) => {
  const { workshopId } = req.params;
  const { userId, group } = req.body;

  try {
    const workshop = await Workshop.findById(workshopId);

    if (!workshop) {
      return res.status(404).json({ error: 'Taller no encontrado' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Verificar que el grupo tiene capacidad disponible en el taller
    const selectedGroup = workshop.groups.find((g) => g._id.toString() === group);

    if (!selectedGroup) {
      return res.status(404).json({ error: 'Grupo no encontrado en el taller' });
    }

    if (selectedGroup.capacity <= 0) {
      return res.status(400).json({ error: 'No hay cupos disponibles en este grupo' });
    }

    // Registrar al usuario en el taller y reducir la capacidad del grupo
    workshop.participants.push(user);
    selectedGroup.capacity -= 1;

    await workshop.save();
    await user.registeredWorkshops.push({ workshop: workshopId, group });
    await user.save();

    res.json({ message: 'Usuario registrado en el taller' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar al usuario en el taller' });
  }
};

module.exports = {
  registerUserToWorkshop,
};
