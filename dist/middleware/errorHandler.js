export const errorHandler = (err, _req, res, _next) => {
    console.error('Error:', err);
    if (err.name === 'ValidationError') {
        res.status(400).json({
            message: 'Validation error',
            error: err.message,
        });
        return;
    }
    if (err.name === 'CastError') {
        res.status(400).json({
            message: 'Invalid ID',
        });
        return;
    }
    res.status(500).json({
        message: 'Server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
};
//# sourceMappingURL=errorHandler.js.map