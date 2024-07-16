
export function getFromDBFavoriteCities(): Promise<string[]> {

    return new Promise((resolve, reject) => {
        // TODO IMPLEMENT
        setTimeout(() => {
            resolve([
                "30126", "30085"
            ]);
        }, 1000);
    });
}