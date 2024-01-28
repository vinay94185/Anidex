import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native"
import { breed } from "../components/prompts"
import REFS from 'react-native-fs';

const Info = ({ route }) => {
    let { image } = route.params;

    const fetchDataFromGoogleAI  = async (base64image: string) => {
        fetch("https://54.152.238.129/api", {
            method: "POST",
            headers: {
                'Content-Type':'application/json'
            },
             body: JSON.stringify({
                contents: {
                    parts: [
                        { text: breed },
                        {
                            "inline_data" : {
                                "mime_type":"image/jpg",
                                "data": base64image
                            }
                        }
                    ]
                }
            })
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log("CATCH ERROR");
            console.log(error);
        });
    };

    // make request to google ai server
    useEffect(() => {
        REFS.readFile(image.path, 'base64')
        .then(res => {
          fetchDataFromGoogleAI(res);
         })
    });


    return (
        <View style={ styles.container } >
            {/* <Image style={ styles.image } source={{ uri: `file:///${image.path}` }} /> */}
        </View>
    )
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
    }
});

export default Info