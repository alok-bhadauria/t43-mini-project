const Log = require("../models/Log");

exports.showProgress = async (req, res) => {
    const userId = req.session.user.userId;

    const logs = await Log.find({ userId }).sort({ timestamp: 1 });

    // Chart labels
    const labels = logs.map(l => new Date(l.timestamp).toLocaleDateString("en-IN"));
    const weightData = logs.map(l => l.updated.weight);

    // BMI values
    const bmiData = logs.map(l => {
        const h = l.updated.height;
        const w = l.updated.weight;
        return +(w / ((h/100)*(h/100))).toFixed(2);
    });

    // 🆕 goal count for doughnut chart
    let goalCount = {};
    logs.forEach(l => {
        (l.updated.goal || []).forEach(g => {
            goalCount[g] = (goalCount[g] || 0) + 1;
        });
    });

    const goalLabels = Object.keys(goalCount);
    const goalValues = Object.values(goalCount);

    return res.render("progress", {
        logs,
        labels,
        weightData,
        bmiData,
        goalLabels,   // 🆕 must be sent
        goalValues    // 🆕 must be sent
    });
};
