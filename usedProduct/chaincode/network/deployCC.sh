#!/bin/bash

C_YELLOW='\033[1;33m'
C_BLUE='\033[0;34m'
C_RESET='\033[0m'

# subinfoln echos in blue color
function infoln() {
  echo -e "${C_YELLOW}${1}${C_RESET}"
}

function subinfoln() {
  echo -e "${C_BLUE}${1}${C_RESET}"
}

# add PATH to ensure we are picking up the correct binaries
export PATH=${HOME}/fabric-samples/bin:$PATH
export FABRIC_CFG_PATH=${PWD}/config

# Chaincode config variable

# CHANNEL_NAME="mychannel"
CC_NAME="teamate"
CC_SRC_PATH="./../contract/"
CC_RUNTIME_LANGUAGE="golang"
CC_VERSION="1"
CHANNEL_NAME="mychannel"


## package the chaincode
infoln "Packaging chaincode"
set -x
peer lifecycle chaincode package ${CC_NAME}.tar.gz --path ${CC_SRC_PATH} --lang ${CC_RUNTIME_LANGUAGE} --label ${CC_NAME}_${CC_VERSION} >&log.txt
{ set +x; } 2>/dev/null
cat log.txt

## Install chaincode on peer0.org1
infoln "Installing chaincode on peer0.org1..."

export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="Org1MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
export CORE_PEER_ADDRESS=localhost:7051

set -x
peer lifecycle chaincode install ${CC_NAME}.tar.gz >&log.txt
{ set +x; } 2>/dev/null
cat log.txt


## Install chaincode on peer0.org2
infoln "Installing chaincode on peer0.org2..."

export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="Org2MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp
export CORE_PEER_ADDRESS=localhost:9051

set -x
peer lifecycle chaincode install ${CC_NAME}.tar.gz >&log.txt
{ set +x; } 2>/dev/null
cat log.txt


## Install chaincode on peer0.org3
infoln "Installing chaincode on peer0.org3..."

export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="Org3MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org3.example.com/peers/peer0.org3.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org3.example.com/users/Admin@org3.example.com/msp
export CORE_PEER_ADDRESS=localhost:11051

set -x
peer lifecycle chaincode install ${CC_NAME}.tar.gz >&log.txt
{ set +x; } 2>/dev/null
cat log.txt


set -x
peer lifecycle chaincode queryinstalled >&log.txt  
{ set +x; } 2>/dev/null
PACKAGE_ID=$(sed -n "/${CC_NAME}_${CC_VERSION}/{s/^Package ID: //; s/, Label:.*$//; p;}" log.txt)



## approve the definition for org1
infoln "approve the definition on peer0.org1..."

ORDERER_CA=${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem

export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="Org1MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
export CORE_PEER_ADDRESS=localhost:7051

set -x
peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile $ORDERER_CA --channelID $CHANNEL_NAME --name ${CC_NAME} --version ${CC_VERSION} --package-id ${PACKAGE_ID} --sequence 1 >&log.txt
{ set +x; } 2>/dev/null
cat log.txt


## approve the definition for org2
infoln "approve the definition on peer0.org2..."

ORDERER_CA=${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem

export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="Org2MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp
export CORE_PEER_ADDRESS=localhost:9051

set -x
peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile $ORDERER_CA --channelID $CHANNEL_NAME --name ${CC_NAME} --version ${CC_VERSION} --package-id ${PACKAGE_ID} --sequence 1 >&log.txt
{ set +x; } 2>/dev/null
cat log.txt


## approve the definition for org3
infoln "approve the definition on peer0.org3..."

ORDERER_CA=${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem

export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="Org3MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org3.example.com/peers/peer0.org3.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org3.example.com/users/Admin@org3.example.com/msp
export CORE_PEER_ADDRESS=localhost:11051

set -x
peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile $ORDERER_CA --channelID $CHANNEL_NAME --name ${CC_NAME} --version ${CC_VERSION} --package-id ${PACKAGE_ID} --sequence 1 >&log.txt
{ set +x; } 2>/dev/null
cat log.txt



## check commitreadiness
peer lifecycle chaincode checkcommitreadiness --channelID $CHANNEL_NAME --name ${CC_NAME} --version ${CC_VERSION} --sequence 1 --tls --cafile $ORDERER_CA --output json


## commit the chaincode definition
infoln "commit the chaincode definition"

PEER_CONN_PARMS="--peerAddresses localhost:7051 --tlsRootCertFiles ${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt --peerAddresses localhost:9051 --tlsRootCertFiles ${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt --peerAddresses localhost:11051 --tlsRootCertFiles ${PWD}/organizations/peerOrganizations/org3.example.com/peers/peer0.org3.example.com/tls/ca.crt"

set -x
peer lifecycle chaincode commit -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile $ORDERER_CA --channelID $CHANNEL_NAME --name ${CC_NAME} $PEER_CONN_PARMS --version ${CC_VERSION} --sequence 1 >&log.txt
{ set +x; } 2>/dev/null
cat log.txt

peer lifecycle chaincode querycommitted --channelID $CHANNEL_NAME --name ${CC_NAME} --cafile $ORDERER_CA


## TEST1 : Invoking the chaincode 
infoln "TEST_Product : Invoking the chaincode : InitProduct"
set -x
peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile $ORDERER_CA -C $CHANNEL_NAME -n ${CC_NAME} $PEER_CONN_PARMS -c '{"function":"InitProduct","Args":["product1","seller1","register","buyer1","20220403","SeongnamSi-Bundang","not reject","20220407"]}' >&log.txt
{ set +x; } 2>/dev/null
cat log.txt
sleep 3

infoln "TEST_Product  : Invoking the chaincode : UpdateProductState"
set -x
peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile $ORDERER_CA -C $CHANNEL_NAME -n ${CC_NAME} $PEER_CONN_PARMS -c '{"function":"UpdateProductState","Args":["product1","sold"]}' >&log.txt
{ set +x; } 2>/dev/null
cat log.txt
sleep 3

infoln "TEST_Product  : Invoking the chaincode : UpdateDeliverState"
set -x
peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile $ORDERER_CA -C $CHANNEL_NAME -n ${CC_NAME} $PEER_CONN_PARMS -c '{"function":"UpdateDeliverState","Args":["product1","dong","deliver1","deliver"]}' >&log.txt
{ set +x; } 2>/dev/null
cat log.txt
sleep 3





infoln "TEST_Seller : Invoking the chaincode :  InitSellerInfo"
set -x
peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile $ORDERER_CA -C $CHANNEL_NAME -n ${CC_NAME} $PEER_CONN_PARMS -c '{"function":"InitSellerInfo","Args":["seller1","0"]}' >&log.txt
{ set +x; } 2>/dev/null
cat log.txt
sleep 3

infoln "TEST_Seller  : Invoking the chaincode : UpdateSellerHistory"
set -x
peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile $ORDERER_CA -C $CHANNEL_NAME -n ${CC_NAME} $PEER_CONN_PARMS -c '{"function":"UpdateSellerHistory","Args":["seller1","product1","buyer1","sold","20220408"]}' >&log.txt
{ set +x; } 2>/dev/null
cat log.txt
sleep 3

infoln "TEST_Seller  : Invoking the chaincode : UpdateSellerHistory -2 "
set -x
peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile $ORDERER_CA -C $CHANNEL_NAME -n ${CC_NAME} $PEER_CONN_PARMS -c '{"function":"UpdateSellerHistory","Args":["seller1","product1","buyer2","deliver","20220409"]}' >&log.txt
{ set +x; } 2>/dev/null
cat log.txt
sleep 3

infoln "TEST_Buyer : Invoking the chaincode :  InitBuyerInfo"
set -x
peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile $ORDERER_CA -C $CHANNEL_NAME -n ${CC_NAME} $PEER_CONN_PARMS -c '{"function":"InitBuyerInfo","Args":["buyer1","0"]}' >&log.txt
{ set +x; } 2>/dev/null
cat log.txt
sleep 3

infoln "TEST_Buyer  : Invoking the chaincode : UpdateBuyerHistory"
set -x
peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile $ORDERER_CA -C $CHANNEL_NAME -n ${CC_NAME} $PEER_CONN_PARMS -c '{"function":"UpdateBuyerHistory","Args":["buyer1","product1","seller1","sold","20220409"]}' >&log.txt
{ set +x; } 2>/dev/null
cat log.txt
sleep 3




## TEST2 : Query the chaincode : GetProductState
infoln "TEST_Product : Query the chaincode : GetProductState"
set -x
peer chaincode query -C $CHANNEL_NAME -n ${CC_NAME} -c '{"function":"GetProductState","Args":["product1"]}' >&log.txt
{ set +x; } 2>/dev/null
cat log.txt

infoln "TEST_Seller : Query the chaincode : GetSellerHistory"
set -x
peer chaincode query -C $CHANNEL_NAME -n ${CC_NAME} -c '{"function":"GetSellerHistory","Args":["seller1"]}' >&log.txt
{ set +x; } 2>/dev/null
cat log.txt

infoln "TEST_Buyer : Query the chaincode : GetBuyerHistory"
set -x
peer chaincode query -C $CHANNEL_NAME -n ${CC_NAME} -c '{"function":"GetBuyerHistory","Args":["buyer1"]}' >&log.txt
{ set +x; } 2>/dev/null
cat log.txt