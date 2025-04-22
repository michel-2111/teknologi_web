const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllUsers = async (req, res) => {
  const users = await prisma.user.findMany({ include: { jurusan: true, prodi: true } });
  res.json(users);
};

exports.getUserById = async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: parseInt(req.params.id) } });
  res.json(user);
};

// exports.createUser = async (req, res) => {
//   const { kode, nama, no_telp, jurusanId, prodiId } = req.body;
//   const newUser = await prisma.user.create({
//     data: { kode, nama, no_telp, jurusanId, prodiId },
//   });
//   res.json(newUser);
// };

//Asli tanpa multer

// exports.createUser = async (req, res) => {
//   try {
//     const { kode, nama, no_telp, jurusanId, prodiId } = req.body;

//     const newUser = await prisma.user.create({
//       data: {
//         kode,
//         nama,
//         no_telp,
//         jurusanId: parseInt(jurusanId, 10),
//         prodiId: parseInt(prodiId, 10),
//       },
//     });

//     res.status(201).json(newUser);
//   } catch (error) {
//     console.error("Error creating user:", error);
//     res.status(500).json({ error: "Terjadi kesalahan saat menambahkan user." });
//   }
// };

exports.createUser = async (req, res) => {
  try {
    const { kode, nama, no_telp, jurusanId, prodiId } = req.body;

    const newUser = await prisma.user.create({
      data: {
        kode,
        nama,
        no_telp,
        jurusanId: parseInt(jurusanId, 10),
        prodiId: parseInt(prodiId, 10),
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Terjadi kesalahan saat menambahkan user." });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { nama, no_telp } = req.body;
  const updatedUser = await prisma.user.update({
    where: { id: parseInt(id) },
    data: { nama, no_telp },
  });
  res.json(updatedUser);
};

exports.deleteUser = async (req, res) => {
  await prisma.user.delete({ where: { id: parseInt(req.params.id) } });
  res.json({ message: "User deleted" });
};
