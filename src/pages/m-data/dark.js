(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports', 'echarts'], factory);
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        factory(exports, require('echarts'));
    } else {
        // Browser globals
        factory({}, root.echarts);
    }
}(this, function (exports, echarts) {
    var log = function (msg) {
        if (typeof console !== 'undefined') {
            console && console.error && console.error(msg);
        }
    };
    if (!echarts) {
        log('ECharts is not Loaded');
        return;
    }
    echarts.registerTheme('dark',{
        "color": [
            "#dd6b66",
            "#759aa0",
            "#e69d87",
            "#8dc1a9",
            "#ea7e53",
            "#eedd78",
            "#73a373",
            "#73b9bc",
            "#7289ab",
            "#91ca8c",
            "#f49f42"
        ],
        // "backgroundColor": "rgba(29, 36, 49, 0.1)",
        "tooltip": {
            "axisPointer": {
                "lineStyle": {
                    "color": "gray"
                },
                "crossStyle": {
                    "color": "gray"
                },
                "label": {
                    "color": "#000"
                }
            }
        },
        "legend": {
            "textStyle": {
                "color": "gray"
            }
        },
        "textStyle": {
            "color": "gray"
        },
        "title": {
            "textStyle": {
                "color": "gray"
            }
        },
        "toolbox": {
            "iconStyle": {
                "borderColor": "gray"
            }
        },
        "dataZoom": {
            "textStyle": {
                "color": "gray"
            }
        },
        "visualMap": {
            "textStyle": {
                "color": "gray"
            }
        },
        "timeline": {
            "lineStyle": {
                "color": "gray"
            },
            "itemStyle": {
                "color": "#759aa0"
            },
            "label": {
                "textStyle": {
                    "color": "gray"
                },
                "color": "gray"
            },
            "controlStyle": {
                "normal": null,
                "emphasis": null,
                "color": "gray",
                "borderColor": "gray"
            }
        },
        "timeAxis": {
            "axisLine": {
                "lineStyle": {
                    "color": "gray"
                }
            },
            "axisTick": {
                "lineStyle": {
                    "color": "gray"
                }
            },
            "axisLabel": {
                "textStyle": {
                    "color": "gray"
                },
                "color": "gray"
            },
            "splitLine": {
                "lineStyle": {
                    "type": "dashed",
                    "color": "#aaa"
                }
            },
            "splitArea": {
                "areaStyle": {
                    "color": "gray"
                }
            }
        },
        "logAxis": {
            "axisLine": {
                "lineStyle": {
                    "color": "gray"
                }
            },
            "axisTick": {
                "lineStyle": {
                    "color": "gray"
                }
            },
            "axisLabel": {
                "textStyle": {
                    "color": "gray"
                },
                "color": "gray"
            },
            "splitLine": {
                "lineStyle": {
                    "type": "dashed",
                    "color": "#aaa"
                }
            },
            "splitArea": {
                "areaStyle": {
                    "color": "gray"
                }
            }
        },
        "valueAxis": {
            "axisLine": {
                "lineStyle": {
                    "color": "gray"
                }
            },
            "axisTick": {
                "lineStyle": {
                    "color": "gray"
                }
            },
            "axisLabel": {
                "textStyle": {
                    "color": "gray"
                },
                "color": "gray"
            },
            "splitLine": {
                "lineStyle": {
                    "type": "dashed",
                    "color": "#aaa"
                }
            },
            "splitArea": {
                "areaStyle": {
                    "color": "gray"
                }
            }
        },
        "categoryAxis": {
            "axisLine": {
                "lineStyle": {
                    "color": "gray"
                }
            },
            "axisTick": {
                "lineStyle": {
                    "color": "gray"
                }
            },
            "axisLabel": {
                "textStyle": {
                    "color": "gray"
                },
                "color": "gray"
            },
            "splitLine": {
                "lineStyle": {
                    "type": "dashed",
                    "color": "#aaa"
                },
                "show": false
            },
            "splitArea": {
                "areaStyle": {
                    "color": "gray"
                }
            }
        },
        "line": {
            "symbol": "circle"
        },
        "graph": {
            "color": [
                "#dd6b66",
                "#759aa0",
                "#e69d87",
                "#8dc1a9",
                "#ea7e53",
                "#eedd78",
                "#73a373",
                "#73b9bc",
                "#7289ab",
                "#91ca8c",
                "#f49f42"
            ]
        },
        "gauge": {
            "title": {
                "textStyle": {
                    "color": "gray"
                }
            }
        },
        "candlestick": {
            "itemStyle": {
                "normal": {
                    "color": "#FD1050",
                    "color0": "#0CF49B",
                    "borderColor": "#FD1050",
                    "borderColor0": "#0CF49B"
                }
            }
        },
        "series": []
    });
}));
