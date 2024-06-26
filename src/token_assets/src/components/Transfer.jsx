import React from "react";
import { token, canisterId, createActor } from "../../../declarations/token"; //
import { AuthClient } from "@dfinity/auth-client"; //
import {Principal} from '@dfinity/principal';

function Transfer() {
  
  const [recipientId,setId] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [isDisabled, setDisabled] = React.useState(false);
  const [feedback,setFeedback] = React.useState("");
  const [isHidden, setHidden] = React.useState(true);
  
  async function handleClick() {//
    setHidden(true);
    setDisabled(true);
    const recipient = Principal.fromText(recipientId);
    const amountToTransfer = Number(amount);

    const authClient = await AuthClient.create(); 
    const identity = await authClient.getIdentity(); 

    const authenticatedCanister = createActor(canisterId, { 
      agentOptions: {
        identity,
      },
    });

    const result = await authenticatedCanister.transfer(recipient, amountToTransfer);
    setFeedback(result);
    setHidden(false);
    setDisabled(false);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={recipientId}
                onChange={function(e){
                  setId(e.target.value);
                }}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={function(e){
                  setAmount(e.target.value);
                }}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} disabled={isDisabled}>
            Transfer
          </button>
        </p>
        <p hidden={isHidden}>{feedback}</p>
      </div>
    </div>
  );
}

export default Transfer;
