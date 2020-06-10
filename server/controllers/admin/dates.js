"use strict";

const models = require("../../models/db");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

exports.getAll = (req, res) => {
  let limit = 5;
  let page = 0;
  let direction = "DESC";
  let sort = "id";
  let filter = null;

  if (req.query.filter) {
    filter = req.query.filter;
  }
  if (req.query.pagesize) {
    limit = parseInt(req.query.pagesize);
  }
  if (req.query.page) {
    page = parseInt(req.query.page);
  }
  if (req.query.direction) {
    direction = req.query.direction;
  }
  if (req.query.sort) {
    sort = req.query.sort;
  }

  let offset = page * limit;

  if (filter) {
    models.Dates.findAndCountAll({
      limit: limit,
      offset: offset,
      order: [[sort, direction]],
      where: {
        [Op.or]: [{ iden: { [Op.like]: filter } }],
      },
    })
      .then((dates) => {
        res.status(200).json({
          records: dates.rows,
          totalRecords: dates.count,
          numberOfPageRecords: limit,
        });
      })
      .catch((error) => {
        res.status(404).send("Internal Server Error:" + error);
      });
  } else {
    models.Dates.findAndCountAll({
      limit: limit,
      offset: offset,
      order: [[sort, direction]],
    })
      .then((dates) => {
        let pages = Math.ceil(dates.count / limit);
        res.status(200).json({
          records: dates.rows,
          totalRecords: dates.count,
          totalPages: pages,
          numberOfPageRecords: limit,
        });
      })
      .catch((error) => {
        res.status(404).send("Internal Server Error:" + error);
      });
  }
};

exports.findByPk = (req, res) => {
  let id = req.params.id;

  models.Dates.findByPk(id, {})
    .then((dates) => {
      res.json(dates);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send(error);
    });
};

exports.create = (req, res) => {
  models.Dates.create(req.body)
    .then((dates) => {
      res.send(dates);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send(error);
    });
};

exports.update = (req, res) => {
  let pId = req.params.id;

  models.Dates.update(req.body, { where: { id: pId } })
    .then(() => {
      res.status(200).send("data updated");
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send(error);
    });
};

exports.delete = (req, res) => {
  let pId = req.params.id;

  models.Dates.destroy({ where: { id: pId } }).then(() => {
    res.status(200).send("data deleted a user with id = " + pId);
  });
};

exports.changeStatus = (req, res) => {
  let id = req.params.id;

  models.Date.update({ status: req.body.status }, { where: { id: id } }).then(
    () => {
      res.status(200).send("data updated a date with id = " + id);
    }
  );
};
