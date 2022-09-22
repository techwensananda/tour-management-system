const Tour = require("../models/TourModel")

exports.getToursService = async (filters, queries) => {
    const tours = await Tour.find(filters)
        .select(queries.fields)
        .sort(queries.sortBy)
        .skip(queries.skip)
        .limit(queries.limit);

    const totalTours = await Tour.countDocuments(filters)
    const pageCount = Math.ceil(totalTours / queries.limit)
    return { totalTours, pageCount, tours };
}