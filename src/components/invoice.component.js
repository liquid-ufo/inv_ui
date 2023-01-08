import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import * as CONSTANTS from "../constants";

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
});

const PARENT_COMPANIES = [
    { id: 1, name: "Agrisphere pvt ltd" },
    { id: 2, name: "Alpha consulting pvt ltd" },
    { id: 3, name: "Sysmon group" },
    { id: 4, name: "Mopac systems" }
];

const CLIENT_NAMES = [
    { id: 1, name: "Balewadi" },
    { id: 2, name: "New Sangvi" },
    { id: 3, name: "Pimple Gurav" },
    { id: 4, name: "Nashik Phata" },
    { id: 5, name: "Khadakee" },
    { id: 6, name: "Vishrantwadi" },
    { id: 7, name: "Viman Nagar" },
    { id: 8, name: "Kalyani Nagar" },
    { id: 9, name: "Viman Nagar" },
    { id: 10, name: "Lohegaon" },
    { id: 11, name: "Kharadi" },
];

function Invoice() {

    const parentCompanyOptions = PARENT_COMPANIES.map((option) => (
        <option key={option.id} value={option.name}>{option.name}</option>
    ));

    const clientNameOptions = CLIENT_NAMES.map((option) => (
        <option key={option.id} value={option.name}>{option.name}</option>
    ));

    const defaultValues = {
        date: new Date().toISOString().split("T")[0],
        payment: "cash"
    }


    const { register, watch, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: { ...defaultValues }
    });
    const onSubmit = data => {
        let param = { ...data };
        if (param.payment === "cheque") {
            param.payment = {
                mode: "cheque",
                chequeNumber: param.chequeNumber
            };
        } else {
            param.payment = {
                mode: "cash",
            };
        }

        delete param.chequeNumber;

        submitForm(param).then(res => {
            reset({ ...defaultValues });
            console.log(res);
            alert("Submitted")
        }).catch((err) => {
            console.log(err);
        })

        console.log(param);
    };

    const formValues = watch();

    useEffect(() => {
        console.log("watchPayment:", formValues.payment);
    }, [formValues.payment]);

    const submitForm = async (data) => {
        console.log("data", data);
        const url = CONSTANTS.API_BASE_URL + "/api/testpdf";
        const response = await fetch(url, {
            method: "POST",
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data)
        });

        return response.json();
    };

    return (
        <div className="container">

            <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                    {/* <!-- Nested Row within Card Body --> */}
                    <div className="row">
                        {/* <div className="col-lg-5 d-none d-lg-block bg-register-image"></div> */}
                        <div className="col-lg-12">
                            <div className="p-5">
                                <div className="text-center">
                                    <h1 className="h4 text-gray-900 mb-4">Create E-Invoice</h1>
                                </div>
                                <form className="user" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="form-group row">
                                        <div className="col-sm-12">
                                            <input type="text" className="form-control form-control-user" id="botuser"
                                                placeholder="User" {...register("user")} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <select className="form-control form-control-user form-select" id="parentCompany" {...register("parentCompany")}>
                                                <option>-----------Parent Company-----------</option>
                                                {parentCompanyOptions}
                                            </select>
                                        </div>

                                        <div className="col-sm-6">
                                            <input type="date" className="form-control form-control-user" id="date"
                                                placeholder="Select Date" {...register("date")} />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <select type="text" className="form-control form-control-user" id="clientName"
                                            placeholder="Client name" {...register("clientName")}>
                                            <option>-----------Client Name-----------</option>
                                            {clientNameOptions}
                                        </select>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-sm-12">
                                            <input type="text" className="form-control form-control-user"
                                                id="amount" placeholder="Amount" {...register("amount")} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <div className="col-sm-12">
                                            <input type="radio" id="cheque" name="payment" value="cheque" {...register("payment")} />
                                            <label htmlFor="cheque">&nbsp;Cheque</label>
                                            <br />
                                            <input type="radio" id="cash" name="payment" value="cash" {...register("payment")} />
                                            <label htmlFor="cash"> &nbsp;Cash</label>
                                        </div>
                                    </div>

                                    {formValues.payment === "cheque" &&
                                        <div className="form-group row">
                                            <div className="col-sm-12">
                                                <input type="text" className="form-control form-control-user" id="chequeNumber"
                                                    placeholder="Cheque number" {...register("chequeNumber")} />
                                            </div>
                                        </div>}

                                    <div className="form-group row">
                                        <div className="col-sm-12">
                                            <input type="text" className="form-control form-control-user" id="clientPhone"
                                                placeholder="Client Phone" {...register("clientPhone")} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <div className="col-sm-12">
                                            <input type="text" className="form-control form-control-user" id="clientAdress"
                                                placeholder="Client Address" {...register("clientAdress")} />
                                        </div>
                                    </div>



                                    <button type="submit" className="btn btn-primary btn-user btn-block">
                                        Submit
                                    </button>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Invoice;