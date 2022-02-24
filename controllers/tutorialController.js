const Tutorial = require("./../models/tutorialModel");
const APIFeatures = require("./../utils/apiFeatures");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");

exports.getAllTutorials = catchAsync(async (req, res, next) => {
  // EXECUTE THE QUERY
  const features = new APIFeatures(Tutorial.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .like();
    const totalDoc = await Tutorial.countDocuments();
  const tutorials = await features.query;
  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: tutorials.length,
    total: totalDoc,
    data: {
      tutorials,
    },
  });
});

exports.getTutorial = catchAsync(async (req, res, next) => {
  const tutorial = await Tutorial.findById(req.params.id);
  // const tour = await Tour.findOne({_id: req.params.id})

  if (!tutorial) {
    return next(new AppError("No tutorial found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      tutorial,
    },
  });
});

exports.getTutorialPublished = catchAsync(async (req, res, next) => {
  const tutorials = await Tutorial.find({ published: true });
  if (!tutorials) {
    return next(new AppError("No tutorials published", 404));
  }

  res.status(200).json({
    status: "success",
    results: tutorials.length,
    data: {
      tutorials,
    },
  });
});

exports.createTutorial = catchAsync(async (req, res, next) => {
  // 1. Check if there is a title and a description
  const {title, description} = req.body;
  if(!title || !description){
  return next(new AppError("Please provide title and description", 400));
  }
  // 2. Add tutorial to the database
  const newTutorial = await Tutorial.create({title, description});

  res.status(201).json({
    status: "success",
    data: {
      tutorial: newTutorial,
    },
  });
});

exports.updateTutorial = catchAsync(async (req, res, next) => {
  const tutorial = await Tutorial.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!tutorial) {
    return next(new AppError("No tutorial found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      tutorial,
    },
  });
});

exports.deleteTutorial = catchAsync(async (req, res, next) => {
  const tutorial = await Tutorial.findByIdAndDelete(req.params.id);

  if (!tutorial) {
    return next(new AppError("No tutorial found with this ID!", 404));
  }

  res.status(204).json({
    status: "success",
    data: {
      data: null,
    },
  });
});

exports.deleteAllTutorial = catchAsync(async (req, res, next) => {
  const tutorials = await Tutorial.deleteMany({});
  if (!tutorials) {
    return next(new AppError("No tutorials found in the database", 404));
  }

  res.status(204).json({
    status: "success",
    data: {
      data: null,
    },
  });
});
