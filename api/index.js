const express = require("express");
const app = express();
const fs = require("fs").promises;
const cors = require("cors");
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const workdir = process.cwd();

const dataFileSrcPath = `${workdir}/data/data.json`;

const dataFilePath = `${workdir}/tmp/data.json`;

async function checkFileExists(file) {
  try {
    await fs.promises.access(
      file,
      fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK
    );
    return true;
  } catch {
    return false;
  }
}

async function getData() {
  const exists = await checkFileExists(dataFilePath);
  if (!exists) {
    await fs.cp(dataFileSrcPath, dataFilePath);
  }
  return await fs.readFile(dataFilePath, "utf8");
}

async function setData(data) {
  await fs.writeFile(dataFilePath, JSON.stringify(data));
}

try {
  app.get("/", async function (req, res) {
    const fsOutput = JSON.parse(await getData());

    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(fsOutput));
  });

  app.post("/new-pokemon", async function (req, res) {
    const { pid, name, evolution } = req.body;

    const fsOutput = JSON.parse(await getData());

    const postOutput = [];

    fsOutput.forEach((item) => {
      postOutput.push(item);
    });

    postOutput.push({
      _id: postOutput.length,
      pid: Number(pid),
      name: name,
      evolution: evolution,
    });

    await setData(postOutput);

    res.setHeader("Content-Type", "application/json");

    res.end(JSON.stringify(postOutput));
  });

  app.put(`/update-pokemon/:id`, async function (req, res) {
    const { id } = req.params;
    const { pid, name, evolution } = req.body;

    const fsOutput = JSON.parse(await getData());

    const postOutput = [];

    fsOutput.forEach((item) => {
      if (item._id === Number(id)) {
        postOutput.push({
          _id: Number(id),
          pid: Number(pid),
          name: name,
          evolution: evolution,
        });
      } else {
        postOutput.push(item);
      }
    });

    await setData(postOutput);

    res.setHeader("Content-Type", "application/json");

    res.end(JSON.stringify(postOutput));
  });

  app.delete(`/delete-pokemon/:id`, async function (req, res) {
    const { id } = req.params;

    const fsOutput = JSON.parse(await getData());

    const postOutput = [];

    fsOutput.forEach((item, idx) => {
      if (item._id !== Number(id)) {
        postOutput.push({
          _id: idx > Number(id) ? idx - 1 : idx,
          pid: Number(item.pid),
          name: item.name,
          evolution: item.evolution,
        });
      }
    });

    await setData(postOutput);

    res.setHeader("Content-Type", "application/json");

    res.end(JSON.stringify(postOutput));
  });
} catch (error) {
  console.log(error);
  throw new Error(error);
}

app.listen(3000, () => console.log("Express Server started at port 3000"));
