(function () {
    EG.demandData = {
        demand_supply_ratio : 0.74038,
        demand_emission_ratio: 0.5,
        demand_categories : ['dom_heat','com_heat','dom_light','com_light','ind_proc','dom_trans','dom_freight',"int_av","int_ship"],
        demand_emission_eq : {
            'dom_heat' : [0,0,0],
            'com_heat' : [0,0,0],
            'dom_light' : [0,0,0],
            'com_light' : [0,0,0],
            'ind_proc' : [0,0,0],
            'dom_trans' : [0,0,0],
            'dom_freight': [0,0,0],
            "int_av" : [0,0,0],
            "int_ship" : [0,0,0]
        },
        demand_trajectories : {
            'dom_heat' : 1,
            'com_heat' : 1,
            'dom_light' : 1,
            'com_light' : 1,
            'ind_proc' : 1,
            'dom_trans' : 1,
            'dom_freight': 1,
            "int_av" : 1,
            "int_ship" : 1
        },
        demand_energy_eq : {
            'dom_heat' : [0,0,0],
            'com_heat' : [0,0,0],
            'dom_light' : [0,0,0],
            'com_light' : [0,0,0],
            'ind_proc' : [0,0,0],
            'dom_trans' : [0,0,0],
            'dom_freight': [0,0,0],
            "int_av" : [0,0,0],
            "int_ship" : [0,0,0]
        },
        jsondata : {
                'dom_heat' :
                {
                    'title' : "Domestic Heat",
                    'desc' : 'This is stuff about Domestic heat.',
                    'info' : {
                        1 : {
                            'quote': 'Average Room Temperature at 20 degrees C, Thermal Leakiness of Dwellings decreases by 25%, Electricity provides 0-10% of heating, Gas is Other source',
                            "cost" : 0,
                            'happiness' : 1
                        },
                        2 : {
                            'quote': 'Average Room Temperature at 18 degrees C, Thermal Leakiness of Dwellings decreases by 33%, Electricity provides 20% of heating, Coal is Other source',
                            "cost" : 100,
                            'happiness' : 0.9
                        },
                        3 : {
                            'quote': 'Average Room Temperature at 17 degrees C, Thermal Leakiness of Dwellings decreases by 40%, Electricity provides 30-60% of heating, Waste Heat from power stations is Other source',
                            "cost" : 300,
                            'happiness' : 0.8
                        },
                        4 : {
                            'quote': 'Average Room Temperature at 16 degrees C, Thermal Leakiness of Dwellings decreases by 50%, Electricity provides 80-100% of heating, Mixture of biogas and others is Other source',
                            "cost" : 500,
                            'happiness' : 0.7
                        }
                    },
                    'energy' :
                    {
                        1 : {
                            'base_change' : 1.55
                        },
                        2 : {
                            'base_change' : 1.24
                        },
                        3 : {
                            'base_change' : 0.74
                        },
                        4 : {
                            'base_change' : 0.49
                        }
                    },
                    'eng_base' : 31.875,
                    'emissions' :
                    {
                        1 : {
                            'base_change' : 1.45
                        },
                        2 : {
                            'base_change' : 2.09
                        },
                        3 : {
                            'base_change' : 0.12
                        },
                        4 : {
                            'base_change' : 0.06
                        }
                    },
                    'base' : 5.642
                },
                'com_heat' :
                {
                    'title' : "Commercial Heat",
                    'desc' : 'This is stuff about commercial heat.',
                    'info' : {
                        1 : {
                            'quote': 'Space heating demand increases by 50%, hot water demand by 60%, cooling demand by 250%, The proportion of non-domestic heat supplied using electricity is 0-10%, as today, The dominant non-electric heat source is gas (biogas if available)',
                            "cost" : 0,
                            'happiness' : 1
                        },
                        2 : {
                            'quote': 'Space heating demand increases by 30%, hot water demand by 50%, cooling demand by 60%, The proportion of non-domestic heat supplied using electricity is 20%, The dominant non-electric heating fuel is coal (biogas if available)',
                            "cost" : 300,
                            'happiness' : 1
                        },
                        3 : {
                            'quote': 'Space heating demand stable, hot water demand increases by 25%, cooling demand stable, The proportion of non-domestic heat supplied using electricity is 30-60%, , The dominant non-electric heat source is heat from power stations',
                            "cost" : 500,
                            'happiness' : 1
                        },
                        4 : {
                            'quote': 'Space heating demand drops by 25%, hot water demand by 10%, cooling demand by 60%, The proportion of non-domestic heat supplied using electricity is 80-100%, non-electric heat is a mixture of gas/biogas, coal/biomass, and heat from power stations',
                            "cost" : 800,
                            'happiness' : 1
                        }
                    },
                    'energy' :
                    {
                        1 : {
                            'base_change' : 1.50
                        },
                        2 : {
                            'base_change' : 1.42
                        },
                        3 : {
                            'base_change' : 0.91
                        },

                        4 : {
                            'base_change' : 0.65
                        }
                    },
                    'eng_base' : 9.658,
                    'emissions' :
                    {
                        1 : {
                            'base_change' : 1.55
                        },
                        2 : {
                            'base_change' : 2.86
                        },
                        3 : {
                            'base_change' : 0.04
                        },
                        4 : {
                            'base_change' : 0.03
                        }
                    },
                    'base' : 1.4
                },
                'dom_light' :
                {
                    'title' : "Domestic Lighting",
                    'desc' : 'This is stuff about Domestic Lighting.',
                    'info' : {
                        1 : {
                            'quote': 'Energy demand for domestic lights and appliances increases by 20% (relative to 2007), Energy used for domestic cooking remains at 63% electricity and 37% gas',
                            "cost" : 0,
                            'happiness' : 1
                        },
                        2 : {
                            'quote': 'Energy demand for domestic lights and appliances is stable, 100% electric',
                            "cost" : 350,
                            'happiness' : 0.9
                        },
                        3 : {
                            'quote': 'Energy demand for domestic lights and appliances decreases by 40%, 100% electric',
                            "cost" : 500,
                            'happiness' : 0.8
                        },
                        4 : {
                            'quote': 'Energy demand for domestic lights and appliances decreases by 60%, 100% electric',
                            "cost" : 600,
                            'happiness' : 0.7
                        }
                    },
                    'energy' :
                    {
                        1 : {
                            'base_change' : 1.77
                        },
                        2 : {
                            'base_change' : 0.98
                        },
                        3 : {
                            'base_change' : 0.66
                        },
                        4 : {
                            'base_change' : 0.52
                        }
                    },
                    'eng_base' : 7.892,
                    'emissions' :
                    {
                        1 : {
                            'base_change' : 1.00
                        },
                        2 : {
                            'base_change' : 0.13
                        },

                        3 : {
                            'base_change' : 0.13
                        },

                        4 : {
                            'base_change' : 0.13
                        }
                    },
                    'base' : 0.125
                },
                'com_light' :
                {
                    'title' : "Commercial Lighting",
                    'desc' : 'This is stuff about commercial Lighting.',
                    'info' : {
                        1 : {
                            'quote': 'Energy demand for lights and appliances increases by 33%. Energy for cooking is stable, 60% electricity and 40% gas (no change from 2007)',
                            "cost" : 10,
                            'happiness' : 1
                        },
                        2 : {
                            'quote': 'Energy demand for lights and appliances increases by 15%; decreases by 5% for cooking, 100% electric',
                            "cost" : 25,
                            'happiness' : 0.95
                        },
                        3 : {
                            'quote': 'Energy demand for lights and appliances decreases by 5%; decreases by 20% for cooking, 100% electric',
                            "cost" : 75,
                            'happiness' : 0.94
                        },
                        4 : {
                            'quote': 'Energy demand for lights and appliances decreases by 30%; decreases by 25% for cooking, 100% electric',
                            "cost" : 100,
                            'happiness' : 0.9
                        }
                    },
                    'emissions' :
                    {
                        1 : {
                            'base_change' : 1.00
                        },
                        2 : {
                            'base_change' : 0.11
                        },
                        3 : {
                            'base_change' : 0.11
                        },
                        4 : {
                            'base_change' : 0.05
                        }
                    },
                    'eng_base' : 9.658,
                    'energy' :
                    {
                        1 : {
                            'base_change' : 1.50
                        },
                        2 : {
                            'base_change' : 1.41
                        },
                        3 : {
                            'base_change' : 0.91
                        },
                        4 : {
                            'base_change' : 0.65
                        }
                    },
                    'base' : 0.142
                },
                'ind_proc' :
                {
                    'title' : "Industrial Processes",
                    'desc' : 'This is stuff about Industrial Processes.',
                    'info' : {
                        1 : {
                            'quote': 'UK industrial sector is the same size and carbon intensity in 2050 (relative to 2007)',
                            "cost" : 0,
                            'happiness' : 1
                        },
                        2 : {
                            'quote': 'UK industrial sector same size with lower carbon intensity in 2050 (relative to 2007)',
                            "cost" : 200,
                            'happiness' : 0.95
                        },
                        3 : {
                            'quote': 'UK industrial sector large with much lower carbon intensity in 2050 (relative to 2007)',
                            "cost" : 500,
                            'happiness' : 0.75
                        },
                        4 : {
                            'quote': 'UK industrial sector small with much lower carbon intensity in 2050 (relative to 2007)',
                            "cost" : 1000,
                            'happiness' : 0.25
                        }
                    },
                    'energy' :
                    {
                        1 : {
                            'base_change' : 1.13
                        },
                        2 : {
                            'base_change' : 0.96
                        },
                        3 : {
                            'base_change' : 1.25
                        },
                        4 : {
                            'base_change' : 0.40
                        }
                    },
                    'eng_base' : 34.05,
                    'emissions' :
                    {
                        1 : {
                            'base_change' : 1.03
                        },
                        2 : {
                            'base_change' : 0.73
                        },
                        3 : {
                            'base_change' : 0.56
                        },
                        4 : {
                            'base_change' : 0.56
                        }
                    },
                    'base' : 7.783
                },
                'dom_trans' :
                {
                    'title' : "Domestic Transport",
                    'desc' : 'This is stuff about Domestic Transport.',
                    'info' : {
                        1 : {
                            'quote': ' Mileage continues to grow, but at a slower rate over time, By 2050, conventional fuelled cars and vans cover 80% of mileage',
                            "cost" : 100,
                            'happiness' : 1
                        },
                        2 : {
                            'quote': 'Some shift from cars to other modes. Cars and vans are 80% of 2050 passenger mileage, By 2050, plug-in, electric and fuel cell cars and vans cover 65% of passenger distance',
                            "cost" : 900,
                            'happiness' : 0.9
                        },
                        3 : {
                            'quote': 'Significant modal shift: cars and vans are 74% of 2050 passenger mileage, By 2050, plug-in, electric and fuel cell cars and vans cover 80% of passenger mileage',
                            "cost" : 750,
                            'happiness' : 0.75
                        },
                        4 : {
                            'quote': 'Significant reliance on low carbon travel options or travel alternatives, By 2050, all car and van travel is electrified; 20% use fuel-cell range extenders',
                            "cost" : 1000,
                            'happiness' : 0.5
                        }
                    },
                    'energy' :
                    {
                        1 : {
                            'base_change' : 0.51
                        },
                        2 : {
                            'base_change' : 0.34
                        },
                        3 : {
                            'base_change' : 0.26
                        },
                        4 : {
                            'base_change' : 0.16
                        }
                    },
                    'eng_base' : 33.6,
                    'emissions' :
                    {
                        1 : {
                            'base_change' : 0.50
                        },
                        2 : {
                            'base_change' : 0.28
                        },
                        3 : {
                            'base_change' : 0.17
                        },
                        4 : {
                            'base_change' : 0.06
                        }
                    },
                    'base' : 8.858
                },
                'dom_freight' :
                {
                    'title' : "Domestic Freight",
                    'desc' : 'This is stuff about Domestic Freight.',
                    'info' : {
                        1 : {
                            'quote': 'Road haulage makes up 73% of distance, using conventional engines. Rail all diesel',
                            "cost" : 0,
                            'happiness' : 1
                        },
                        2 : {
                            'quote': 'Some shift from road to rail and water, and more efficient engines',
                            "cost" : 100,
                            'happiness' : 1
                        },
                        3 : {
                            'quote': 'Greater modal shift to rail and water; more efficient HGVs; more efficient logistics',
                            "cost" : 500,
                            'happiness' : 0.9
                        },
                        4 : {
                            'quote': 'Road modal share falls to half; greater hybridisation. Rail freight is all electric ',
                            "cost" : 1000,
                            'happiness' : 0.75
                        }
                    },
                    'energy' :
                    {
                        1 : {
                            'base_change' : 1.47
                        },
                        2 : {
                            'base_change' : 0.85
                        },
                        3 : {
                            'base_change' : 0.45
                        },
                        4 : {
                            'base_change' : 0.33
                        }
                    },
                    'eng_base' : 7.308,
                    'emissions' :
                    {
                        1 : {
                            'base_change' : 1.42
                        },
                        2 : {
                            'base_change' : 1.01
                        },
                        3 : {
                            'base_change' : 0.64
                        },
                        4 : {
                            'base_change' : 0.58
                        }
                    },
                    'base' : 2.308
                },
                'int_av' :
                {
                    'title' : "International Aviation",
                    'desc' : 'This is stuff about International Aviation.',
                    'info' : {
                        1 : {
                            'quote': 'Annual improvement in fleet fuel efficiency of 0.8%. CCC "likely" scenario',
                            "cost" : 0,
                            'happiness' : 1
                        },
                        2 : {
                            'quote': 'Annual improvement in fleet fuel efficiency of 1.0%. CCC "optimistic" scenario',
                            "cost" : 100,
                            'happiness' : 1
                        },
                        3 : {
                            'quote': 'Annual improvement in fleet fuel efficiency of 1.0%. CCC "optimistic" scenario',
                            "cost" : 100,
                            'happiness' : 1
                        },
                        4 : {
                            'quote': 'Annual improvement in fleet fuel efficiency of 1.5%. CCC "speculative" scenario',
                            "cost" : 1000,
                            'happiness' : 0.9
                        }
                    },
                    'energy' :
                    {
                        1 : {
                            'base_change' : 1.35
                        },
                        2 : {
                            'base_change' : 1.22
                        },
                        3 : {
                            'base_change' : 1.22
                        },
                        4 : {
                            'base_change' : 0.98
                        }
                    },
                    'eng_base' : 12.75,
                    'emissions' :
                    {
                        1 : {
                            'base_change' : 1.35
                        },
                        2 : {
                            'base_change' : 1.22
                        },
                        3 : {
                            'base_change' : 1.22
                        },
                        4 : {
                            'base_change' : 0.06
                        }
                    },
                    'base' : 3.25
                },
                'int_ship' :
                {
                    'title' : "International Shipping",
                    'desc' : 'This is stuff about International Shipping.',
                    'info' : {
                        1 : {
                            'quote': 'Moves in line with IMO global shipping forecast (assuming constant UK share)',
                            "cost" : 0,
                            'happiness' : 1
                        },
                        2 : {
                            'quote': 'Moves in line with IMO global shipping forecast (assuming constant UK share)',
                            "cost" : 10,
                            'happiness' : 1
                        },
                        3 : {
                            'quote': 'Moves in line with IMO global shipping forecast (assuming constant UK share)',
                            "cost" : 10,
                            'happiness' : 1
                        },
                        4 : {
                            'quote': 'Moves in line with IMO global shipping forecast (assuming constant UK share)',
                            "cost" : 10,
                            'happiness' : 1
                        }
                    },
                    'energy' :
                    {
                        1 : {
                            'base_change' : 4.37
                        },
                        2 : {
                            'base_change' : 4.37
                        },
                        3 : {
                            'base_change' : 4.37
                        },
                        4 : {
                            'base_change' : 4.37
                        }
                    },
                    'eng_base' : 2.417,
                    'emissions' :
                    {
                        1 : {
                            'base_change' : 4.39
                        },
                        2 : {
                            'base_change' : 4.39
                        },
                        3 : {
                            'base_change' : 4.39
                        },
                        4 : {
                            'base_change' : 4.39
                        }
                    },
                    'base' : 0.617
                }
        }
    };
})();
