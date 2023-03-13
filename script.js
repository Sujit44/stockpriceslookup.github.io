

    // on pressing enter
    addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        document.getElementById("btn1").click();
    }
    });
    let saved_data = {};
    let first_time = true;

      // on clicking button
      function func()
        {
            var str = document.getElementById("symbol").value;
            var api = 'https://cloud.iexapis.com/stable/stock/';
            var api_key = '/quote?token=pk_4b541c56c998491e9b6c905a35a880e9';
            var url = api + str + api_key;
                console.log(url)

            async function getData(){
                const response = await fetch(url);
                const data = await response.json();
                saved_data = data;
                const { companyName, symbol, iexRealtimePrice, previousClose, isUSMarketOpen } = data;


                document.getElementById('name').textContent = companyName;
                document.getElementById('sym').textContent = symbol;

                var price = iexRealtimePrice;
                let dollarUS = Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                });
                
                document.getElementById('pclose').textContent = dollarUS.format(previousClose);
                document.getElementById('hours').textContent = isUSMarketOpen;

                console.log('Log1: ', companyName);
                console.log('Log2: ', iexRealtimePrice);
                console.log('Log3: ', isUSMarketOpen);
            }
            getData()
            .then(response => {
                console.log('Function ran successfully');
            })
            .catch(error => {
                alert('Please enter a valid symbol');
                console.log('Error raised');
                console.error(error);
            });
        }

        function add_table()
        {
            // check if symbol is empty
            if (document.getElementById('name').value == '')
            {
                alert('Please enter a symbol');
                return;
            }
            let price = saved_data.iexClose;
            let shares = document.getElementById('shares').value;
            // print the values
            //console.log('Log5: ', saved_data);
            //console.log('Log6: ', shares);
            // change the values to integers and multiply
            let total = parseInt(price) * parseInt(shares);

            //console.log('Log4: ', price);
            let dollarUS = Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            });
            total = dollarUS.format(total);
            let name = saved_data.companyName;
            let symbol = saved_data.symbol;
            let table = document.getElementById('table');

            if (first_time == true)
            {
                first_time = false;
                // create table headers name, symbol, price, shares, total
                let row = table.insertRow(0);
                let cell1 = row.insertCell(0);
                let cell2 = row.insertCell(1);
                let cell3 = row.insertCell(2);
                let cell4 = row.insertCell(3);
                let cell5 = row.insertCell(4);
                cell1.innerHTML = "Name";
                cell2.innerHTML = "Symbol";
                cell3.innerHTML = "Price";
                cell4.innerHTML = "Shares";
                cell5.innerHTML = "Total";
            }
            // insert a row
            let row = table.insertRow(1);
            // insert cells
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            let cell4 = row.insertCell(3);
            let cell5 = row.insertCell(4);
            // insert values
            cell1.innerHTML = name;
            cell2.innerHTML = symbol;
            cell3.innerHTML = price;
            cell4.innerHTML = shares;
            cell5.innerHTML = total;

            // clear the input fields
            document.getElementById('symbol').value = '';
            document.getElementById('shares').value = '';

            // clear the output fields
            document.getElementById('name').textContent = '';
            document.getElementById('sym').textContent = '';
            document.getElementById('pclose').textContent = '';
            document.getElementById('hours').textContent = '';
        }
