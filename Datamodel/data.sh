
srcPath='./data'
cd $srcPath

echo "Start the process...."

userNumber=100
generate=False ## if need to change

if $generate ; then
	echo "Generate $userNumber email address..."
	python3 generate_email.py $userNumber
	echo "Generate tables1...."
	python3 generate_table.py
fi

echo "\nStart insert data..."
python3 insert_test_data.py

if $generate ; then
	echo "\nGenerate tables2...."
	python3 generate_table2.py
fi

echo "\nStart insert data2..."
python3 insert_test_data2.py

echo "\nFinish....!!"