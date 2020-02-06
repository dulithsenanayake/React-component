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
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { CardActions } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        border: '1px solid black',
        borderRadius: 20,
        backgroundColor: theme.palette.primary,
        height: 300,
        padding: '20px',
    },
    diagramContainer: {
        border: '1px dashed black',
        borderRadius: 20,
        height: '100%',
        position: 'relative',
        display: 'flex',
        overflowX: 'auto',
        padding: '0px 30px'
    },
    imgContainer: {
        borderRadius: '100%',
        height: '100%',
        width: 100,
        overflow: 'hidden',
        margin: '10px',
    },
    img: {
        width: '100%',
        height: '100%',
    },
    mediator: {
        display: 'flex',
        marginInlineEnd: '60px',
    },
    cardContainer: {
        display: "flex",
        alignItems: "center",
    },
    name: {
        textAlign: "center",
        width: '100px',
    },
    card: {
        minHeight: '200px'
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

        let path = "";
        let jsonObject = null;

        if (window["runConfig"]) {

            path = window["runConfig"].resourcePath + "/";
            jsonObject = window["runConfig"].jsonValue;
        }

        const mediatorIcons = [
            {
                'key': 'logmediator',
                'name': 'log',
                'src': path + 'img/icons/mediatorIcons/log-mediator.svg',
            },
            {
                'key': 'propertymediator',
                'name': 'property',
                'src': path + 'img/icons/mediatorIcons/property-mediator.svg',
            },
            {
                'key': 'dropmediator',
                'name': 'drop',
                'src': path + 'img/icons/mediatorIcons/drop-mediator.svg',
            },
            {
                'key': 'propertygroupmediator',
                'name': 'propertyGroup',
                'src': path + 'img/icons/mediatorIcons/propertyGroup-mediator.svg',
            },
            {
                'key': 'scriptmediator',
                'name': 'script',
                'src': path + 'img/icons/mediatorIcons/script-mediator.svg',
            },
            {
                'key': 'classmediator',
                'name': 'class',
                'src': path + 'img/icons/mediatorIcons/class-mediator.svg',
            },
            {
                'key': 'payloadfactorymediator',
                'name': 'payloadfactory',
                'src': path + 'img/icons/mediatorIcons/payloadFactory-mediator.svg',
            },
        ];

        let jsonText = JSON.parse(jsonObject);

        let newAddedMediators = [];
        for (let icons in mediatorIcons) {
            for (let mediators in jsonText.elements[0].elements) {
                if (mediatorIcons[icons].name === jsonText.elements[0].elements[mediators].name) {
                    newAddedMediators.push({
                        uuid: generateId(),
                        ...mediatorIcons[icons],
                        name: mediatorIcons[icons].name,
                        attribute_name: jsonText.elements[0].elements[mediators].attributes.name
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
                            <div className={classes.mediator} key={mediator.uuid}>
                                <div className={classes.cardContainer}>
                                    <Card className={classes.card}>
                                        <CardContent>
                                            <Typography
                                                className={classes.name}
                                                noWrap={true}
                                                title={`${mediator.name}Mediator`}
                                            >
                                                {mediator.name}Mediator
                                                </Typography>
                                        </CardContent>
                                        <CardMedia
                                            className={classes.imgContainer}
                                            key={mediator.uuid}
                                        >
                                            <img
                                                src={mediator.src}
                                                alt='{madiator.name}'
                                                className={classes.img}
                                            />
                                        </CardMedia>
                                        <CardActions>
                                            <Typography
                                                className={classes.name}
                                                noWrap={true}
                                                title={mediator.attribute_name}
                                            >
                                                {mediator.attribute_name}
                                            </Typography>
                                        </CardActions>

                                    </Card>
                                </div>
                                <div>
                                    <ArrowRightAltIcon
                                        style={{
                                            paddingRight: 10,
                                            fontSize: 60,
                                            height: '100%',
                                            position: 'absolute',
                                        }}
                                    />
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