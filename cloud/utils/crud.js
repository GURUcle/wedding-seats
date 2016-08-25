module.exports = function () {
    /**
     * This class is a factory used to CRUD the database
     * 
     * @class CRUD
     */
    return {
        /**
         * Creates an object for a model
         * 
         * @method create
         * @param {Object} model The mongoose model which the CRUD operation will be applied on
         * @param {Object} data The data that will be used to insert into the model
         * @param {Function} success The callback to be called on success
         * @param {Function} error The callback to be called on error
         */
        create: function (model, data, success, error) {
            model.create(data, function (exception, object) {
                if (exception) {
                    error(exception);
                } else {
                    success(object);
                }
            });
        },

        /**
         * Finds all objects for a model
         * 
         * @method findAll
         * @param {Object} model The mongoose model which the CRUD operation will be applied on
         * @param {Object} parameters The options to pass through i.e. sort, limit and skip
         * @param {Object} sort The data that will be used to sort the results in ascending or descedning order
         * @param {Number} limit The number of records to return at a time
         * @param {Number} skip The number of records to skip before retrieving records
         * @param {Function} success The callback to be called on success
         * @param {Function} error The callback to be called on error
         */
        findAll: function (model, parameters, sort, limit, skip, success, error) {
            model
                .find(parameters)
                .sort(sort)
                .limit(limit)
                .skip(skip)
                .populate('owner')
                .exec(function (exception, object) {
                    if (exception) {
                        error(exception);
                    } else {
                        success(object);
                    }
                });
        },

        /**
         * Finds an object for a model
         * 
         * @method findOne
         * @param {Object} model The mongoose model which the CRUD operation will be applied on
         * @param {Object} data The data that will be used to find an object
         * @param {Function} success The callback to be called on success
         * @param {Function} error The callback to be called on error
         */
        findOne: function (model, data, success, error) {
            model
                .findOne(data)
                .populate('owner')
                .exec(function (exception, object) {
                    if (exception) {
                        error(exception);
                    } else {
                        success(object);
                    }
                });
        },

        /**
         * Update an object for a model
         * 
         * @method update
         * @param {Object} model The mongoose model which the CRUD operation will be applied on
         * @param {Object} parameters The data the find will be based on
         * @param {Object} data The data that will be used to insert into the model
         * @param {Function} success The callback to be called on success
         * @param {Function} error The callback to be called on error
         */
        update: function (model, parameters, data, success, error) {
            model.update(parameters, {
                $set: data
            }, {
                    upsert: true
                }).exec(function (exception, object) {
                    if (exception) {
                        error(exception);
                    } else {
                        success(object);
                    }
                });
        },

        /**
         * Count number of objects for a model
         * 
         * @method count
         * @param {Object} model The mongoose model which the CRUD operation will be applied on
         * @param {Object} parameters The data the find will be based on
         * @param {Object} data The data that will be used to insert into the model
         * @param {Function} success The callback to be called on success
         * @param {Function} error The callback to be called on error
         */
        count: function (model, parameters, success, error) {
            model.count(parameters).exec(function (exception, object) {
                if (exception) {
                    error(exception);
                } else {
                    success(object);
                }
            });
        }
    };
};