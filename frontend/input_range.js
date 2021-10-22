import React, {useState} from 'react';
import { Text, FlatList, StyleSheet, View, TextInput, Button } from 'react-native';

//FRONTEND VERSION
export default function Input(){ //added default
    const [inRangePartners, setInRangePartners] = useState([])
    let inputRange = 0

    const renderPartner = ({item}) => {
        return(
            DisplayPartner(item)
        )
    }

    const MainHeader = () => {
        return (
            <View>
                <Text style={styles.mainHeader}>Companies in-range:</Text>
                <br/>
            </View>
        )
    }

    const EmptyHeader = () => {
        return <View></View>
    }
    

    return(
        <View>
            <TextInput placeholder="Enter Range (Km)" onChange={OnChangeHandle} />
            <br/>
            <Button onPress={() => OnButtonClicked()} title="Display"/>
            <br/>

            <FlatList data={inRangePartners}
                renderItem={renderPartner}
                ListHeaderComponent={inRangePartners.length > 0 ? MainHeader : EmptyHeader}>
            </FlatList>
        </View>
    ); //hello

    function OnChangeHandle(inputData) {
        // setInputRange(inputData.target.value)
        inputRange = inputData.target.value
    }

    function OnButtonClicked() {
        const url = "/api/fetchData"
        const apiPort = 9000
        let validPartners = null
        //*<newCode>

        fetch("http://localhost:" + apiPort.toString() + url, {
                mode: 'cors',
                method: 'POST',
                body: JSON.stringify({
                    inputRange: inputRange
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                res.json().then((res) => {
                        //*res: object with keys: data (partners data) and confirmation (success or fail)

                        validPartners = res.data
                        const vpObject = JSON.parse(validPartners)

                        setInRangePartners(vpObject)
                    })
                    .catch(err => {
                        console.log("Error in receiving response from server, or parsing data at client:\n" + err)
                    })

            })
    }
    
    function DisplayPartner(partner){
        //displays Partner company name, location(s) and address(es)
        //partner =  {organization (companyName), branches} 
        //where branches is an array == [{location, address, coordinates}]
        //display in the following format:
        //company name
        // for each office:
        //  office#, address
        
        const SingleCompany = (props) =>{
            const companyName = <Text style={styles.companyName}>{props.partner.organization}</Text> //header style
            const list = <FlatList 
                data={props.partner.branches}
                renderItem={BranchRender} 
                style={styles.item}/>
            return (
                <View>
                    {companyName}
                    {list}
                </View>
            );
        }

        const BranchRender = ({item, index}) => {
            return(
                <View>
                    <Text style={styles.office}>Office #{index+1}</Text>
                    <FlatList 
                    data={[item.location, item.address]} 
                    renderItem={BranchDataRender}
                    style={styles.officeData}/>
                </View>
            )
        }

        const BranchDataRender = ({item, index}) => {
            return <Text style={styles.item}>{index === 0 ? "Location: " : "Address: "}{item}</Text>
        }
        
        return(
            <SingleCompany partner={partner} />
        );
    }
}

const fontRatio = 0.8
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: 40,
      paddingHorizontal: 20*fontRatio,
    },
    item: {
      marginLeft: 20,
      marginTop: 20,
      padding: 0,
      fontSize: 24*fontRatio,
    },
    companyName:{
        marginLeft: 20,
        marginBottom: -10,
        marginTop: 50,
        padding: 0,
        fontSize: 48*fontRatio,
    },
    office:{
        marginLeft: 30,
        marginTop: 30,
        marginBottom: -20,
        padding: 0,
        fontSize: 28*fontRatio,
        textDecorationLine: 'underline'
    },
    officeData: {
      marginLeft: 30,
      marginTop: 20,
      padding: 0,
      fontSize: 24*fontRatio,
    },
    mainHeader: {
        marginLeft: 15,
        marginTop: 20,
        padding: 0,
        fontSize: 30*fontRatio,
      }
    });