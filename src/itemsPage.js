import React from 'react';
import data from './data.json';
const itemsSortedOut = data.items.reduce((acc, oneItem) => {
    if (oneItem.into) {
        acc.simpleItems[oneItem.name] = { ...oneItem };
        if (!acc.simpleItemsTier[oneItem.tier]) {
            acc.simpleItemsTier[oneItem.tier] = [];
        }
        acc.simpleItemsTier[oneItem.tier].push(oneItem.name);
        acc.intoItems[oneItem.name] = oneItem.into.slice(0);
        return acc;
    }
    if (oneItem.combine) {
        acc.combinedItems[oneItem.name] = { ...oneItem };
        if (!acc.combinedItemsTier[oneItem.tier]) {
            acc.combinedItemsTier[oneItem.tier] = [];
        }
        acc.combinedItemsTier[oneItem.tier].push(oneItem.name);
        acc.combinedItems[oneItem.name] = oneItem.combine.slice(0);
        return acc;
    }
}, { simpleItems: {}, combinedItems: {}, intoItems: {}, simpleItemsTier: {}, combinedItemsTier: {} });
export default function items() {
    return (
        <>
            <ul>
                {Object.keys(itemsSortedOut.combinedItemsTier).map(tier => (
                    <li>
                        {itemsSortedOut.combinedItemsTier[tier].map(name => (
                            <>
                                <div className="items">
                                    <img src={data.itemPics[name]} alt={name} />
                                    =  {itemsSortedOut.combinedItems[name].map((simpeItemName, idx, arr) => (
                                        <img src={data.itemPics[simpeItemName]} alt={simpeItemName} className={simpeItemName.toLowerCase().replace(/[\s_,'.]/gi, '')} />
                                    ))}

                                </div>

                            </>
                        ))}
                    </li>
                )
                )}
            </ul>

        </>
    );
}
