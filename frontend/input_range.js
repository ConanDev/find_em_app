import React, {useState} from 'react';
import { Text, FlatList, View, TextInput, Button } from 'react-native';

//FRONTEND VERSION
export default function Input(){ //added default
    const [inputRange, setInputRange] = useState(0)
    const [inRangePartners, setInRangePartners] = useState(<View></View>)

    return(
        <View>
            <TextInput placeholder="Enter Range (Km)" onChange={OnChangeHandle} />
            <Button onPress={() => OnButtonClicked()} title="Display"/>
            <br/>
            <FlatList data={inRangePartners}
                renderItem={({item})=>{<Text>{item}</Text>}}>
            </FlatList>
        </View>
    ); //hello

    function OnChangeHandle(inputData){
        setInputRange(inputData.target.value)
    }

    function OnButtonClicked(){
        console.log("Button was clicked")
        const url = "/api/fetchData" //* don't need to send data here (as a route inside url)
        const apiPort = 9000
        let validPartners = null
        //*<newCode>

        fetch("http://localhost:" + apiPort.toString() + url, {
            mode: 'cors',
            method: 'POST',
            body: JSON.stringify({inputRange: inputRange}),
            headers: {'Content-Type': 'application/json'}
        })
        .then((res)=>{
            res.json().then((res)=>{
            //*res: object with keys: data (partners data) and confirmation (success or fail)
            validPartners = JSON.parse(res.data).map(DisplayPartner)
            setInRangePartners(validPartners)
        })
        .catch(err=>{
            console.log("Error in receiving response from server:\n" + err)
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
        /**
         * 
         * Finally I have found it!

        The First FlatList you import from react-native

        import {FlatList} from 'react-native'
        And the second (inside-FlatList) you can import from react-native-gesture-handler

        import {FlatList as FlatList2} from 'react-native-gesture-handler'
        Then you can use the same orientation and it will work.
         */
        //TODO: Indentation
        const SingleCompany = (props) =>{
            const companyName = <Text>{props.partner.organization}</Text> //header style
            const list = <FlatList 
                data={props.partner.branches}
                renderItem={BranchRender} />
            return (
                <View>
                    {companyName}
                    {list}
                </View>
            );
        }

        const BranchRender = ({branch, index}) => {
            return(
                <View>
                    <Text>Office #{index+1}</Text>
                    <FlatList 
                    data={[branch.location, branch.address]} 
                    renderItem={BranchDataRender}/>
                </View>
            )
        }

        const BranchDataRender = ({branchData, index}) => {
            return <Text>{index === 0 ? "Location: " : "Address: "}{branchData}</Text>
        }

        return(//all was rapped inside a <li> -- used View instead
            <SingleCompany partner={partner} />
        );
    }
}

// return(//all was rapped inside a <li> -- used View instead
//     <View>
//         <Text >{partner.organization}</Text>{/**header */}
//         <FlatList>
//             {partner.branches.map((branch, index) => {
//                 return(//must label out-of-range office!
//                 <li>Office #{index+1}
//                 <ul>
//                     <li>Location: {branch.location}</li>
//                     <li>Address: {branch.address}</li>
//                 </ul>
//                 </li>
//                 );
//             })}
//         </FlatList>
//     </View>
// );