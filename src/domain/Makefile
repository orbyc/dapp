# Path to this plugin
PROTOC_GEN_TS_PATH="./node_modules/.bin/protoc-gen-ts"

# Directory to write generated code to (.js and .d.ts files)
OUT_DIR="./core"

golang:
	protoc \
	--go_out=${OUT_DIR} \
	--go_opt=paths=source_relative \
	--go-grpc_out=${OUT_DIR} \
	--go-grpc_opt=paths=source_relative \
	*.proto


js:
	protoc \
    --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
    --js_out="import_style=commonjs,binary:${OUT_DIR}" \
    --ts_out="${OUT_DIR}" \
    *.proto

all: golang js