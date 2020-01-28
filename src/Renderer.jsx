/*
 * Copyright (c) 2019, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { useEffect } from 'react';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

const useStyles = makeStyles((theme) => ({
    container: {
        border: '1px solid black',
        borderRadius: 20,
        backgroundColor: theme.palette.white,
        margin: 50,
        height: '100%',
        padding: 70,
    },
    diagramContainer: {
        border: '1px dashed black',
        borderRadius: 20,
        height: 300,
        position: 'relative',
        display: 'flex',
        justifyContent: 'center'
    },
    imgContainer: {
        borderRadius: '100%',
        height: '100%',
        width: 100,
        overflow: 'hidden',
    },
    img: {
        width: '100%',
        height: '100%',
    },
    mediator: {
        display: 'flex',
        marginInlineEnd: '60px'
    }
}));

function Renderer() {

    const classes = useStyles();
    const [addedMediators, setAddedMediators] = useState([]);

    function generateId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0; const
                v = c === 'x' ? r : (r && 0x3 | 0x8);
            return v.toString(16);
        });
    }

    useEffect(() => {

        const mediatorIcons = [
            {
                'key': 'logmediator',
                'name': 'log',
                'src': './img/icons/mediatorIcons/log-mediator.svg',
            },
            {
                'key': 'propertymediator',
                'name': 'property',
                'src': './img/icons/mediatorIcons/property-mediator.svg',
            },
            {
                'key': 'dropmediator',
                'name': 'drop',
                'src': './img/icons/mediatorIcons/drop-mediator.svg',
            },
            {
                'key': 'propertygroupmediator',
                'name': 'propertyGroup',
                'src': './img/icons/mediatorIcons/propertyGroup-mediator.svg',
            },
            {
                'key': 'scriptmediator',
                'name': 'script',
                'src': './img/icons/mediatorIcons/script-mediator.svg',
            },
            {
                'key': 'classmediator',
                'name': 'class',
                'src': './img/icons/mediatorIcons/class-mediator.svg',
            },
            {
                'key': 'scriptmediator',
                'name': 'script',
                'src': './img/icons/mediatorIcons/class-mediator.svg',
            },
            {
                'key': 'payloadfactorymediator',
                'name': 'payloadfactory',
                'src': './img/icons/mediatorIcons/payloadFactory-mediator.svg',
            },
        ];

        let jsonText = {
            "declaration": {
                "attributes": {
                    "version": "1.0",
                    "encoding": "UTF-8"
                }
            },
            "elements": [
                {
                    "type": "element",
                    "name": "sequence",
                    "attributes": {
                        "name": "json_validator",
                        "trace": "disable",
                        "xmlns": "http://ws.apache.org/ns/synapse"
                    },
                    "elements": [
                        {
                            "type": "element",
                            "name": "log",
                            "attributes": {
                                "level": "custom"
                            },
                            "elements": [
                                {
                                    "type": "element",
                                    "name": "property",
                                    "attributes": {
                                        "name": "IN_MESSAGE",
                                        "value": "json_validator"
                                    }
                                }
                            ]
                        },
                        {
                            "type": "element",
                            "name": "property",
                            "attributes": {
                                "name": "maxPropertyCount",
                                "value": "100"
                            }
                        },
                        {
                            "type": "element",
                            "name": "property",
                            "attributes": {
                                "name": "maxStringLength",
                                "value": "100"
                            }
                        },
                        {
                            "type": "element",
                            "name": "property",
                            "attributes": {
                                "name": "maxArrayElementCount",
                                "value": "100"
                            }
                        },
                        {
                            "type": "element",
                            "name": "property",
                            "attributes": {
                                "name": "maxKeyLength",
                                "value": "100"
                            }
                        },
                        {
                            "type": "element",
                            "name": "property",
                            "attributes": {
                                "name": "maxJsonDepth",
                                "value": "100"
                            }
                        },
                        {
                            "type": "element",
                            "name": "property",
                            "attributes": {
                                "name": "RequestMessageBufferSize",
                                "value": "1024"
                            }
                        },
                        {
                            "type": "element",
                            "name": "class",
                            "attributes": {
                                "name": "org.wso2.carbon.apimgt.gateway.mediators.JsonSchemaValidator"
                            }
                        }
                    ]
                }
            ]
        }

        let newAddedMediators = [];
        for (let x in mediatorIcons) {
            for (let y in jsonText.elements[0].elements) {
                if (mediatorIcons[x].name === jsonText.elements[0].elements[y].name) {
                    newAddedMediators.push({
                        uuid: generateId(),
                        ...mediatorIcons[x]
                    });
                }
            }
        }
        setAddedMediators(newAddedMediators);
    }, []);

    return (
        <>
            <Paper className={classes.container}>
                <Grid className={classes.diagramContainer}>
                    {addedMediators.map((mediator) => {
                        return (
                            <div className={classes.mediator}>
                                <div className={classes.imgContainer} key={mediator.uuid}>
                                    <img src={(mediator.src)} alt='{madiator.name}' className={classes.img} />
                                </div>
                                <div>
                                    <ArrowRightAltIcon
                                        style={{
                                            paddingRight: 10,
                                            fontSize: 60,
                                            height: '100%',
                                            position: 'absolute',
                                        }} />
                                </div>
                            </div>      
                        );
                    })}
                </Grid>
            </Paper>
        </>
    );
}

export default Renderer;