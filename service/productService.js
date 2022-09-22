const Tour = require("../models/TourModel")

exports.getProductsService = async (filters, queries) => {
    const tours = await Tour.find(filters)
        .sort(queries.sortBy)
        .skip(queries.skip)
        .limit(queries.limit);
    // console.log(tours)
    return tours;
}