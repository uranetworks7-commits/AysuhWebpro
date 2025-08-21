
"use client";

import React, { useState, useRef } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { PlusCircle, Trash2, Download, FileText, Mail, Phone, Linkedin, MapPin, Building, Briefcase, Globe, HeartPulse, Droplets, ShieldAlert, User, Calendar, PhoneCall } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const resumeSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  address: z.string().min(1, 'Address is required'),
  linkedin: z.string().url('Invalid URL').optional().or(z.literal('')),
  summary: z.string().min(1, 'Summary is required'),
  experiences: z.array(z.object({
    title: z.string().min(1, 'Job title is required'),
    company: z.string().min(1, 'Company name is required'),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().min(1, 'End date is required'),
    description: z.string().min(1, 'Description is required'),
  })),
  education: z.array(z.object({
    school: z.string().min(1, 'School name is required'),
    degree: z.string().min(1, 'Degree is required'),
    gradYear: z.string().min(1, 'Graduation year is required'),
  })),
  skills: z.array(z.object({
    name: z.string().min(1, 'Skill is required'),
  })),
});

const businessCardSchema = z.object({
    fullName: z.string().min(1, 'Full name is required'),
    jobTitle: z.string().min(1, 'Job title is required'),
    company: z.string().min(1, 'Company is required'),
    email: z.string().email('Invalid email address'),
    phoneNumber: z.string().min(1, 'Phone number is required'),
    website: z.string().url('Invalid URL').optional().or(z.literal('')),
});

const emergencyCardSchema = z.object({
    fullName: z.string().min(1, 'Full name is required'),
    dob: z.string().min(1, 'Date of birth is required'),
    bloodType: z.string().min(1, 'Blood type is required'),
    allergies: z.string().optional(),
    medicalConditions: z.string().optional(),
    contacts: z.array(z.object({
        name: z.string().min(1, 'Contact name is required'),
        phone: z.string().min(1, 'Contact phone is required'),
    })),
});


type ResumeFormData = z.infer<typeof resumeSchema>;
type BusinessCardFormData = z.infer<typeof businessCardSchema>;
type EmergencyCardFormData = z.infer<typeof emergencyCardSchema>;

const ResumePreview = ({ getValues, isPreviewing }: { getValues: () => ResumeFormData, isPreviewing: boolean }) => {
  const values = getValues();

  if (!values.fullName && !isPreviewing) {
    return (
      <div className="text-center text-muted-foreground p-8">
        Fill out the form to see a live preview of your resume.
      </div>
    );
  }

  return (
    <div className="p-8 bg-white text-black font-sans text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold tracking-tight text-gray-800">{values.fullName || 'Your Name'}</h1>
        <div className="flex justify-center items-center flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600 mt-2">
            <div className="flex items-center gap-1.5"><Mail className="h-3 w-3" /><span>{values.email || 'your.email@example.com'}</span></div>
            <div className="flex items-center gap-1.5"><Phone className="h-3 w-3" /><span>{values.phoneNumber || '(123) 456-7890'}</span></div>
            <div className="flex items-center gap-1.5"><MapPin className="h-3 w-3" /><span>{values.address || 'Your City, State'}</span></div>
            {values.linkedin && <div className="flex items-center gap-1.5"><Linkedin className="h-3 w-3" /><span>{values.linkedin}</span></div>}
        </div>
      </div>
      
      <div className="mb-4">
        <h2 className="text-sm font-bold uppercase tracking-widest border-b-2 border-gray-300 pb-1 mb-2 text-primary">Summary</h2>
        <p className="text-gray-700 text-justify">{values.summary || 'A brief professional summary highlighting your key skills, experience, and career objectives. Tailor this to the job you are applying for to make a strong first impression.'}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-sm font-bold uppercase tracking-widest border-b-2 border-gray-300 pb-1 mb-2 text-primary">Experience</h2>
        {values.experiences?.map((exp, index) => (
          <div key={index} className="mb-3">
            <div className="flex justify-between">
              <h3 className="font-bold text-gray-900">{exp.title || 'Job Title'}</h3>
              <p className="text-gray-600 text-xs">{exp.startDate || 'Start Date'} - {exp.endDate || 'End Date'}</p>
            </div>
            <p className="italic text-gray-800">{exp.company || 'Company Name'}</p>
            <p className="text-gray-700 mt-1 whitespace-pre-wrap text-justify">{exp.description || 'Describe your responsibilities and achievements in this role. Use bullet points or short paragraphs to highlight your contributions and skills.'}</p>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h2 className="text-sm font-bold uppercase tracking-widest border-b-2 border-gray-300 pb-1 mb-2 text-primary">Education</h2>
        {values.education?.map((edu, index) => (
          <div key={index} className="mb-2">
             <div className="flex justify-between">
                <h3 className="font-bold text-gray-900">{edu.degree || 'Degree or Certificate'}</h3>
                <p className="text-gray-600 text-xs">{edu.gradYear || 'Year'}</p>
             </div>
            <p className="italic text-gray-800">{edu.school || 'School or University Name'}</p>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-sm font-bold uppercase tracking-widest border-b-2 border-gray-300 pb-1 mb-2 text-primary">Skills</h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {values.skills?.map((skill, index) => (
            <span key={index} className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">{skill.name || 'Skill'}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

const BusinessCardPreview = ({ getValues, isPreviewing }: { getValues: () => BusinessCardFormData, isPreviewing: boolean }) => {
    const values = getValues();

    if (!values.fullName && !isPreviewing) {
        return (
          <div className="text-center text-muted-foreground p-8">
            Fill out the form to see a live preview of your business card.
          </div>
        );
    }
    
    return (
        <div className="bg-white text-black p-6 rounded-lg shadow-lg w-[350px] h-[200px] flex flex-col justify-between font-sans" style={{ fontFamily: "'Inter', sans-serif" }}>
            <div>
                <h2 className="text-2xl font-bold text-gray-800">{values.fullName || 'Your Name'}</h2>
                <p className="text-primary font-semibold">{values.jobTitle || 'Job Title'}</p>
                <p className="text-gray-600 font-medium">{values.company || 'Company Name'}</p>
            </div>
            <div className="text-xs text-gray-700 space-y-1 text-right">
                <p className="flex items-center justify-end gap-2"><Phone className="h-3 w-3" /><span>{values.phoneNumber || '(123) 456-7890'}</span></p>
                <p className="flex items-center justify-end gap-2"><Mail className="h-3 w-3" /><span>{values.email || 'your.email@example.com'}</span></p>
                {values.website && <p className="flex items-center justify-end gap-2"><Globe className="h-3 w-3" /><span>{values.website}</span></p>}
            </div>
        </div>
    )
}

const EmergencyCardPreview = ({ getValues, isPreviewing }: { getValues: () => EmergencyCardFormData, isPreviewing: boolean }) => {
    const values = getValues();

    if (!values.fullName && !isPreviewing) {
        return (
          <div className="text-center text-muted-foreground p-8">
            Fill out the form to see a live preview of your emergency card.
          </div>
        );
    }

    return (
        <div className="bg-white text-black p-6 rounded-lg shadow-lg w-[350px] font-sans text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
            <div className="text-center mb-4 pb-2 border-b-2 border-red-500">
                <h2 className="text-xl font-bold text-red-600 uppercase">Emergency Info</h2>
            </div>
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-gray-600"/>
                    <div>
                        <p className="text-xs text-gray-500">Full Name</p>
                        <p className="font-semibold text-gray-800">{values.fullName || 'Your Name'}</p>
                    </div>
                </div>
                 <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-gray-600"/>
                    <div>
                        <p className="text-xs text-gray-500">Date of Birth</p>
                        <p className="font-semibold text-gray-800">{values.dob || 'DD/MM/YYYY'}</p>
                    </div>
                </div>
                 <div className="flex items-center gap-3">
                    <Droplets className="h-5 w-5 text-gray-600"/>
                    <div>
                        <p className="text-xs text-gray-500">Blood Type</p>
                        <p className="font-semibold text-gray-800">{values.bloodType || 'e.g., O+'}</p>
                    </div>
                </div>
                <div>
                    <p className="text-xs font-bold uppercase text-red-600 mt-3 mb-1">In Case of Emergency</p>
                     <div className="flex items-start gap-3">
                        <ShieldAlert className="h-5 w-5 text-gray-600 mt-0.5 flex-shrink-0"/>
                        <div>
                            <p className="text-xs text-gray-500">Allergies & Conditions</p>
                            <p className="font-medium text-gray-800 whitespace-pre-wrap">{values.allergies || 'None listed'}</p>
                            <p className="font-medium text-gray-800 whitespace-pre-wrap mt-1">{values.medicalConditions || 'None listed'}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <p className="text-xs text-gray-500">Emergency Contacts</p>
                    {values.contacts?.map((contact, index) => (
                         <div key={index} className="flex items-center gap-3 mt-1">
                            <PhoneCall className="h-5 w-5 text-gray-600"/>
                            <div>
                                <p className="font-semibold text-gray-800">{contact.name || 'Contact Name'}</p>
                                <p className="text-xs text-gray-700">{contact.phone || 'Contact Phone'}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const ResumeForm = ({ form }: { form: any }) => {
  const { fields: expFields, append: appendExp, remove: removeExp } = useFieldArray({ control: form.control, name: 'experiences' });
  const { fields: eduFields, append: appendEdu, remove: removeEdu } = useFieldArray({ control: form.control, name: 'education' });
  const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({ control: form.control, name: 'skills' });
  
  return (
    <Form {...form}>
      <form className="space-y-6">
        <Card>
            <CardHeader><CardTitle className="text-lg">Personal Details</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <FormField control={form.control} name="fullName" render={({ field }) => (<FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel>Email</FormLabel><FormControl><Input placeholder="john.doe@example.com" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="phoneNumber" render={({ field }) => (<FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input placeholder="(123) 456-7890" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="address" render={({ field }) => (<FormItem><FormLabel>Address</FormLabel><FormControl><Input placeholder="City, State" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="linkedin" render={({ field }) => (<FormItem><FormLabel>LinkedIn Profile URL</FormLabel><FormControl><Input placeholder="https://linkedin.com/in/johndoe" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="summary" render={({ field }) => (<FormItem><FormLabel>Summary</FormLabel><FormControl><Textarea placeholder="A brief professional summary..." {...field} /></FormControl><FormMessage /></FormItem>)} />
            </CardContent>
        </Card>

        <Card>
            <CardHeader><CardTitle className="text-lg">Work Experience</CardTitle></CardHeader>
            <CardContent className="space-y-4">
            {expFields.map((field, index) => (
                <div key={field.id} className="p-4 border rounded-md space-y-2 relative">
                    <FormField control={form.control} name={`experiences.${index}.title`} render={({ field }) => (<FormItem><FormLabel>Job Title</FormLabel><FormControl><Input placeholder="Software Engineer" {...field} /></FormControl><FormMessage/></FormItem>)} />
                    <FormField control={form.control} name={`experiences.${index}.company`} render={({ field }) => (<FormItem><FormLabel>Company</FormLabel><FormControl><Input placeholder="Tech Corp" {...field} /></FormControl><FormMessage/></FormItem>)} />
                    <div className="grid grid-cols-2 gap-4">
                        <FormField control={form.control} name={`experiences.${index}.startDate`} render={({ field }) => (<FormItem><FormLabel>Start Date</FormLabel><FormControl><Input type="text" placeholder="Jan 2022" {...field} /></FormControl><FormMessage/></FormItem>)} />
                        <FormField control={form.control} name={`experiences.${index}.endDate`} render={({ field }) => (<FormItem><FormLabel>End Date</FormLabel><FormControl><Input type="text" placeholder="Present" {...field} /></FormControl><FormMessage/></FormItem>)} />
                    </div>
                    <FormField control={form.control} name={`experiences.${index}.description`} render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea placeholder="Describe your role and achievements." {...field} /></FormControl><FormMessage/></FormItem>)} />
                    <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeExp(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={() => appendExp({ title: '', company: '', startDate: '', endDate: '', description: '' })}><PlusCircle className="mr-2 h-4 w-4" /> Add Experience</Button>
            </CardContent>
        </Card>

        <Card>
             <CardHeader><CardTitle className="text-lg">Education</CardTitle></CardHeader>
             <CardContent className="space-y-4">
                {eduFields.map((field, index) => (
                    <div key={field.id} className="p-4 border rounded-md space-y-2 relative">
                        <FormField control={form.control} name={`education.${index}.school`} render={({ field }) => (<FormItem><FormLabel>School/University</FormLabel><FormControl><Input placeholder="University of Technology" {...field} /></FormControl><FormMessage/></FormItem>)} />
                        <FormField control={form.control} name={`education.${index}.degree`} render={({ field }) => (<FormItem><FormLabel>Degree/Certificate</FormLabel><FormControl><Input placeholder="B.S. in Computer Science" {...field} /></FormControl><FormMessage/></FormItem>)} />
                        <FormField control={form.control} name={`education.${index}.gradYear`} render={({ field }) => (<FormItem><FormLabel>Graduation Year</FormLabel><FormControl><Input placeholder="2024" {...field} /></FormControl><FormMessage/></FormItem>)} />
                        <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeEdu(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => appendEdu({ school: '', degree: '', gradYear: '' })}><PlusCircle className="mr-2 h-4 w-4" /> Add Education</Button>
             </CardContent>
        </Card>

        <Card>
            <CardHeader><CardTitle className="text-lg">Skills</CardTitle></CardHeader>
            <CardContent className="space-y-4">
            {skillFields.map((field, index) => (
                <div key={field.id} className="flex items-end gap-2">
                   <FormField control={form.control} name={`skills.${index}.name`} render={({ field }) => (<FormItem className="flex-grow"><FormLabel>Skill</FormLabel><FormControl><Input placeholder="e.g. JavaScript" {...field} /></FormControl><FormMessage/></FormItem>)} />
                   <Button type="button" variant="ghost" size="icon" onClick={() => removeSkill(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </div>
            ))}
             <Button type="button" variant="outline" size="sm" onClick={() => appendSkill({ name: '' })}><PlusCircle className="mr-2 h-4 w-4" /> Add Skill</Button>
            </CardContent>
        </Card>
      </form>
    </Form>
  )
}

const BusinessCardForm = ({ form }: { form: any }) => {
    return (
        <Form {...form}>
            <form className="space-y-6">
                <Card>
                    <CardHeader><CardTitle className="text-lg">Business Card Details</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <FormField control={form.control} name="fullName" render={({ field }) => (<FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="jobTitle" render={({ field }) => (<FormItem><FormLabel>Job Title</FormLabel><FormControl><Input placeholder="Software Engineer" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="company" render={({ field }) => (<FormItem><FormLabel>Company</FormLabel><FormControl><Input placeholder="Tech Corp" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel>Email</FormLabel><FormControl><Input placeholder="john.doe@example.com" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="phoneNumber" render={({ field }) => (<FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input placeholder="(123) 456-7890" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="website" render={({ field }) => (<FormItem><FormLabel>Website</FormLabel><FormControl><Input placeholder="https://johndoe.com" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    </CardContent>
                </Card>
            </form>
        </Form>
    )
}

const EmergencyCardForm = ({ form }: { form: any }) => {
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'contacts',
    });

    return (
        <Form {...form}>
            <form className="space-y-6">
                <Card>
                    <CardHeader><CardTitle className="text-lg">Personal Information</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <FormField control={form.control} name="fullName" render={({ field }) => (<FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="dob" render={({ field }) => (<FormItem><FormLabel>Date of Birth</FormLabel><FormControl><Input placeholder="DD/MM/YYYY" {...field} /></FormControl><FormMessage /></FormItem>)} />
                         <FormField
                            control={form.control}
                            name="bloodType"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Blood Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select blood type" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="A+">A+</SelectItem>
                                        <SelectItem value="A-">A-</SelectItem>
                                        <SelectItem value="B+">B+</SelectItem>
                                        <SelectItem value="B-">B-</SelectItem>
                                        <SelectItem value="AB+">AB+</SelectItem>
                                        <SelectItem value="AB-">AB-</SelectItem>
                                        <SelectItem value="O+">O+</SelectItem>
                                        <SelectItem value="O-">O-</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle className="text-lg">Medical Details</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <FormField control={form.control} name="allergies" render={({ field }) => (<FormItem><FormLabel>Allergies</FormLabel><FormControl><Textarea placeholder="e.g., Peanuts, Penicillin" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="medicalConditions" render={({ field }) => (<FormItem><FormLabel>Medical Conditions</FormLabel><FormControl><Textarea placeholder="e.g., Asthma, Diabetes" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle className="text-lg">Emergency Contacts</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        {fields.map((field, index) => (
                             <div key={field.id} className="p-4 border rounded-md space-y-2 relative">
                                <FormField control={form.control} name={`contacts.${index}.name`} render={({ field }) => (<FormItem><FormLabel>Contact Name</FormLabel><FormControl><Input placeholder="Jane Doe" {...field} /></FormControl><FormMessage/></FormItem>)} />
                                <FormField control={form.control} name={`contacts.${index}.phone`} render={({ field }) => (<FormItem><FormLabel>Contact Phone</FormLabel><FormControl><Input placeholder="(123) 456-7890" {...field} /></FormControl><FormMessage/></FormItem>)} />
                                <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => remove(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                            </div>
                        ))}
                        <Button type="button" variant="outline" size="sm" onClick={() => append({ name: '', phone: '' })}><PlusCircle className="mr-2 h-4 w-4" /> Add Contact</Button>
                    </CardContent>
                </Card>
            </form>
        </Form>
    )
}

export default function ResumeMakerPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [activeTab, setActiveTab] = useState("resume");

  const resumeForm = useForm<ResumeFormData>({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      address: '',
      linkedin: '',
      summary: '',
      experiences: [{ title: '', company: '', startDate: '', endDate: '', description: '' }],
      education: [{ school: '', degree: '', gradYear: '' }],
      skills: [{ name: 'React' }, { name: 'Next.js' }, { name: 'Tailwind CSS' }],
    },
    mode: "onChange"
  });

  const businessCardForm = useForm<BusinessCardFormData>({
    resolver: zodResolver(businessCardSchema),
    defaultValues: {
      fullName: '',
      jobTitle: '',
      company: '',
      email: '',
      phoneNumber: '',
      website: ''
    },
    mode: "onChange"
  });

  const emergencyCardForm = useForm<EmergencyCardFormData>({
    resolver: zodResolver(emergencyCardSchema),
    defaultValues: {
      fullName: '',
      dob: '',
      bloodType: '',
      allergies: '',
      medicalConditions: '',
      contacts: [{ name: '', phone: '' }],
    },
    mode: "onChange"
  });

  const resumePreviewRef = useRef<HTMLDivElement>(null);
  const businessCardPreviewRef = useRef<HTMLDivElement>(null);
  const emergencyCardPreviewRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = async () => {
    let inputRef, fileNamePrefix, orientation: "portrait" | "landscape" = 'portrait';
    
    if (activeTab === 'resume') {
        inputRef = resumePreviewRef;
        fileNamePrefix = `resume-${resumeForm.getValues('fullName').replace(' ', '-') || 'resume'}`;
        orientation = 'portrait';
    } else if (activeTab === 'business-card') {
        inputRef = businessCardPreviewRef;
        fileNamePrefix = `business-card-${businessCardForm.getValues('fullName').replace(' ', '-') || 'card'}`;
        orientation = 'landscape';
    } else {
        inputRef = emergencyCardPreviewRef;
        fileNamePrefix = `emergency-card-${emergencyCardForm.getValues('fullName').replace(' ', '-') || 'card'}`;
        orientation = 'portrait';
    }

    const input = inputRef.current;
    if (!input) return;

    setIsSubmitting(true);
    try {
        const canvas = await html2canvas(input, {
          scale: 2, 
          backgroundColor: '#ffffff',
          useCORS: true,
        });

        const imgData = canvas.toDataURL('image/png');
        
        const pdf = new jsPDF({
          orientation: orientation,
          unit: 'px',
          format: [canvas.width, canvas.height],
        });

        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save(`${fileNamePrefix}.pdf`);
    } catch (error) {
        console.error("Error generating PDF:", error);
    } finally {
        setIsSubmitting(false);
    }
  };

  const hasResumeValues = Object.values(resumeForm.watch()).some(value => {
      if (Array.isArray(value)) {
          return value.length > 0 && Object.values(value[0]).some(v => v);
      }
      return !!value;
  });

  const hasBusinessCardValues = Object.values(businessCardForm.watch()).some(value => !!value);
  const hasEmergencyCardValues = Object.values(emergencyCardForm.watch()).some(value => {
      if (Array.isArray(value)) {
          return value.length > 0 && Object.values(value[0]).some(v => v);
      }
      return !!value;
  });

  React.useEffect(() => {
    if (activeTab === 'resume') {
        setIsPreviewing(hasResumeValues);
    } else if (activeTab === 'business-card') {
        setIsPreviewing(hasBusinessCardValues);
    } else {
        setIsPreviewing(hasEmergencyCardValues);
    }
  }, [hasResumeValues, hasBusinessCardValues, hasEmergencyCardValues, activeTab]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <FileText className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Document Maker</h1>
            <p className="text-muted-foreground">Create a professional resume, business card, or emergency card.</p>
          </div>
        </div>
        <Button onClick={handleDownloadPdf} disabled={isSubmitting || !isPreviewing}>
          {isSubmitting ? 'Generating...' : <><Download className="mr-2 h-4 w-4" /> Download PDF</>}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
            <TabsTrigger value="resume">Resume Maker</TabsTrigger>
            <TabsTrigger value="business-card">Business Card Maker</TabsTrigger>
            <TabsTrigger value="emergency-card">Emergency Card</TabsTrigger>
        </TabsList>
        <TabsContent value="resume">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mt-4">
                <Card>
                    <CardHeader><CardTitle>Resume Information</CardTitle></CardHeader>
                    <CardContent><ResumeForm form={resumeForm} /></CardContent>
                </Card>
                <div className="lg:sticky lg:top-24 h-fit">
                  <Card>
                    <CardHeader><CardTitle>Live Preview</CardTitle></CardHeader>
                    <CardContent className="bg-gray-100 rounded-md shadow-inner">
                        <div ref={resumePreviewRef}>
                            <ResumePreview getValues={() => resumeForm.getValues()} isPreviewing={hasResumeValues} />
                        </div>
                    </CardContent>
                  </Card>
                </div>
            </div>
        </TabsContent>
        <TabsContent value="business-card">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mt-4">
                <Card>
                    <CardHeader><CardTitle>Business Card Information</CardTitle></CardHeader>
                    <CardContent><BusinessCardForm form={businessCardForm} /></CardContent>
                </Card>
                <div className="lg:sticky lg:top-24 h-fit">
                  <Card>
                    <CardHeader><CardTitle>Live Preview</CardTitle></CardHeader>
                    <CardContent className="bg-gray-100 rounded-md shadow-inner flex items-center justify-center p-4">
                        <div ref={businessCardPreviewRef}>
                            <BusinessCardPreview getValues={() => businessCardForm.getValues()} isPreviewing={hasBusinessCardValues} />
                        </div>
                    </CardContent>
                  </Card>
                </div>
            </div>
        </TabsContent>
        <TabsContent value="emergency-card">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mt-4">
                <Card>
                    <CardHeader><CardTitle>Emergency Card Information</CardTitle></CardHeader>
                    <CardContent><EmergencyCardForm form={emergencyCardForm} /></CardContent>
                </Card>
                <div className="lg:sticky lg:top-24 h-fit">
                  <Card>
                    <CardHeader><CardTitle>Live Preview</CardTitle></CardHeader>
                    <CardContent className="bg-gray-100 rounded-md shadow-inner flex items-center justify-center p-4">
                        <div ref={emergencyCardPreviewRef}>
                            <EmergencyCardPreview getValues={() => emergencyCardForm.getValues()} isPreviewing={hasEmergencyCardValues} />
                        </div>
                    </CardContent>
                  </Card>
                </div>
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
