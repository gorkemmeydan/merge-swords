import { combineReducers } from "redux";

import blockchainReducer from "./blockchain/blockchain.reducer";
import inventoryReducer from "./inventory/inventory.reducer";
import mintReducer from "./mint/mint.reducer";
import battleReducer from "./battle/battle.reducer";
import mergeReducer from "./merge/merge.reducer";
import trashReducer from "./trash/trash.reducer";
import transferReducer from "./transfer/transfer.reducer";
import marketplaceReducer from "./marketplace/marketplace.reducer";

const rootReducer = combineReducers({
  blockchain: blockchainReducer,
  inventory: inventoryReducer,
  mint: mintReducer,
  battle: battleReducer,
  merge: mergeReducer,
  trash: trashReducer,
  transfer: transferReducer,
  marketplace: marketplaceReducer,
});

export default rootReducer;
