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
        if (!acc.itemsIntoDic[oneItem.combine[0]]) {
            acc.itemsIntoDic[oneItem.combine[0]] = {};
        }
        if (!acc.itemsIntoDic[oneItem.combine[1]]) {
            acc.itemsIntoDic[oneItem.combine[1]] = {};
        }
        acc.itemsIntoDic[oneItem.combine[0]][oneItem.combine[1]] = oneItem.name;
        acc.itemsIntoDic[oneItem.combine[1]][oneItem.combine[0]] = oneItem.name;
        return acc;
    }
}, { simpleItems: {}, combinedItems: {}, intoItems: {}, simpleItemsTier: {}, combinedItemsTier: {}, itemsIntoDic: {} });
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
                                    =  {itemsSortedOut.combinedItems[name].map((simpleItemName) => (
                                        <img key={`${name}-${simpleItemName}`} src={data.itemPics[simpleItemName]} alt={simpleItemName} className={simpleItemName.toLowerCase().replace(/[\s_,'.]/gi, '')} />
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
export function ItemsInGrid() {
    const namesOfItems = Object.keys(itemsSortedOut.itemsIntoDic);
    console.log(itemsSortedOut.itemsIntoDic);
    return (
        <table>
            <thead>
                <tr>
                    <th className="empty-cell fat-grey-border"></th>
                    {namesOfItems.map(simpleItemName => (
                        <th key={simpleItemName}><img src={data.itemPics[simpleItemName]} alt={simpleItemName} className={simpleItemName.toLowerCase().replace(/[\s_,'.]/gi, '')} /></th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {namesOfItems.map((simpleItemName, idx) => (
                    <tr key={`${simpleItemName}-${idx}`}>
                        <th><img src={data.itemPics[simpleItemName]} alt={simpleItemName} className={simpleItemName.toLowerCase().replace(/[\s_,'.]/gi, '')} /></th>
                        {namesOfItems.map((simplISecondLoop, idxx) => (
                            <td key={`${simpleItemName}-${simplISecondLoop}-${idxx}`} className={simpleItemName === simplISecondLoop ? 'fat-grey-border' : ''}>
                                <img
                                    src={data.itemPics[itemsSortedOut.itemsIntoDic[simpleItemName][simplISecondLoop]]}
                                    alt={itemsSortedOut.itemsIntoDic[simpleItemName][simplISecondLoop]}
                                />
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>

        </table>

    )
}